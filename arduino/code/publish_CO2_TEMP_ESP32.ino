#include <Arduino.h>
#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// char ssid[] = "Freebox-45F6D3";                // your network SSID (name)
// char password[] = "sesquiopus4#-dimens3-relegam63-adirere38";
const char *ssid = "NIKE_NETWORK_24";
const char *password = "Mot2passeenfait";
const char *mqtt_server = "celsius.ovh";
int status = WL_IDLE_STATUS;  // the Wi-Fi radio's status
const int16_t SCD_ADDRESS = 0x62;

WiFiClient espClient;
PubSubClient client(espClient);

#define MSG_BUFFER_SIZE (255)
char msg[MSG_BUFFER_SIZE];
unsigned long now;
StaticJsonDocument<192> doc;
const char *ntpServer = "pool.ntp.org";
unsigned long Epoch_Time;

// Get_Epoch_Time() Function that gets current epoch time
unsigned long Get_Epoch_Time() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    // Serial.println("Failed to obtain time");
    return (0);
  }
  time(&now);
  return now;
}

void setup_wifi() {

  Serial.print("Attempting to connect to network: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  // Will try for about 10 seconds (20x 500ms)
  int tryDelay = 500;
  int numberOfTries = 20;
  // Wait for the WiFi event
  while (true) {
    switch (WiFi.status()) {
      case WL_NO_SSID_AVAIL:
        Serial.println("[WiFi] SSID not found");
        break;
      case WL_CONNECT_FAILED:
        Serial.print("[WiFi] Failed - WiFi not connected! Reason: ");
        return;
        break;
      case WL_CONNECTION_LOST:
        Serial.println("[WiFi] Connection was lost");
        break;
      case WL_SCAN_COMPLETED:
        Serial.println("[WiFi] Scan is completed");
        break;
      case WL_DISCONNECTED:
        Serial.println("[WiFi] WiFi is disconnected");
        break;
      case WL_CONNECTED:
        Serial.println("[WiFi] WiFi is connected!");
        Serial.print("[WiFi] IP address: ");
        Serial.println(WiFi.localIP());
        return;
        break;
      default:
        Serial.print("[WiFi] WiFi Status: ");
        Serial.println(WiFi.status());
        break;
    }
    delay(tryDelay);

    if (numberOfTries <= 0) {
      Serial.print("[WiFi] Failed to connect to WiFi!");
      // Use disconnect function to force stop trying to connect
      WiFi.disconnect();
      return;
    } else {
      numberOfTries--;
    }
  }
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(2, LOW);  // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(2, HIGH);  // Turn the LED off by making the voltage HIGH
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(), "celsius123", "celsius123")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(2, OUTPUT);  // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  while (!Serial)
    ;
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  configTime(0, 0, ntpServer);
  // output format
  Serial.println("CO2(ppm)\tTemperature(degC)\tRelativeHumidity(percent)");
  // init I2C
  Wire.begin();
  // wait until sensors are ready, > 1000 ms according to datasheet
  delay(1000);
  // start scd measurement in periodic mode, will update every 5 s
  Wire.beginTransmission(SCD_ADDRESS);
  Wire.write(0x21);
  Wire.write(0xb1);
  Wire.endTransmission();
  // wait for first measurement to be finished
  delay(5000);
}

void loop() {
  float co2, temperature, humidity;
  uint8_t data[12], counter;
  // send read data command
  Wire.beginTransmission(SCD_ADDRESS);
  Wire.write(0xec);
  Wire.write(0x05);
  Wire.endTransmission();
  // read measurement data: 2 bytes co2, 1 byte CRC,
  // 2 bytes T, 1 byte CRC, 2 bytes RH, 1 byte CRC,
  // 2 bytes sensor status, 1 byte CRC
  // stop reading after 12 bytes (not used)
  // other data like  ASC not included
  Wire.requestFrom(SCD_ADDRESS, 12);
  counter = 0;
  while (Wire.available()) {
    data[counter++] = Wire.read();
  }
  // floating point conversion according to datasheet
  co2 = (float)((uint16_t)data[0] << 8 | data[1]);
  // convert T in degC
  temperature = -45 + 175 * (float)((uint16_t)data[3] << 8 | data[4]) / 65536;
  // convert RH in %
  humidity = 100 * (float)((uint16_t)data[6] << 8 | data[7]) / 65536;

  Serial.print(co2);
  Serial.print("\t");
  Serial.print(temperature);
  Serial.print("\t");
  Serial.print(humidity);
  Serial.println();
  // wait 10 s for next measurement
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  now = Get_Epoch_Time();

  doc["date"] = now;
  doc["sensorId"] = "1";
  doc["co2"] = co2;
  doc["temp"] = temperature;
  doc["humidity"] = humidity;
  serializeJson(doc, msg);

  if (temperature > 0 && temperature < 55) {
    Serial.println(msg);
    client.publish("sensor/data", msg);
    delay(298000);
  } else {
    digitalWrite(2, LOW);
    delay(1000);
    digitalWrite(2, HIGH);
    delay(100);
    digitalWrite(2, LOW);
    delay(1000);
    digitalWrite(2, HIGH);
    delay(100);
    digitalWrite(2, LOW);
    Serial.println("Sensor sending bad data.. Check wiring");
  }
  delay(1000);
}
