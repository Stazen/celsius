#include <WiFiNINA.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

char ssid[] = "NIKE_NETWORK_24";
char pass[] = "Mot2passeenfait";

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org"); // You can change the NTP server if needed

void setup() {
  Serial.begin(9600);

  // Connect to Wi-Fi
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Initialize the NTP client
  timeClient.begin();
}

void loop() {
  timeClient.update();

  Serial.print("Unix Time: ");
  Serial.println(timeClient.getEpochTime());

  delay(1000); // Adjust the delay according to your needs
}
