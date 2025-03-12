"use client";

import { Button } from "@/components/LandingPage/button";
import { Clients } from "@/components/LandingPage/clients";
import { Container } from "@/components/LandingPage/container";
import { Faq } from "@/components/LandingPage/faq";
import { Features } from "@/components/LandingPage/features";
import { Footer } from "@/components/LandingPage/footer";
import { Header } from "@/components/LandingPage/header";
import { Hero, HeroSubtitle, HeroTitle } from "@/components/LandingPage/hero";
import { HeroImage } from "@/components/LandingPage/heroImage";
import { Prices } from "@/components/LandingPage/prices";
import { Arrow } from "@/public/images/landingPage/arrow";
import { StarsIllustration } from "@/public/images/landingPage/stars";
import classNames from "classnames";
import { useState } from "react";
import { ContactForm } from "@/components/LandingPage/contact";

const data = [
  {
    question: "Qu'est-ce que le monitoring ?",
    answer:
      "Le monitoring de pièces par des capteurs environnementaux, comme la température ou le CO2, désigne le processus de surveillance continue et d'analyse des conditions environnementales à l'intérieur de locaux ou d'espaces spécifiques. Il vise à détecter les variations de ces paramètres et à optimiser les conditions de confort et d'efficacité énergétique.",
  },
  {
    question: "Quels sont les avantages de Celsius ?",
    answer:
      "Celsius est capable de monitorer la présence humaine et le chauffage dans vos locaux. Une comparaison de ces valeurs permet à l'application de vous avertir en cas d'anomalies, comme des pièces vides qui seraient chauffées. Le but affiché ici est de réduire la consommation énergétique inutile, afin de réduire vos factures et votre impact environnemental.",
  },
  {
    question: "Comment installer Celsius ?",
    answer:
      "Lors de votre achat, nous effectuerons une analyse de vos locaux afin de déterminer les meilleurs emplacements pour nos capteurs. Un installateur certifié Celsius viendra alors mettre en place la solution dans vos locaux. Nos équipes pourront ainsi paramétrer votre site et vous laisser la main pour la suite.",
  },
  {
    question: "Quels sont les tarifs de Celsius ?",
    answer:
      "Celsius est disponible pour un tarif de 250€ par capteur à l'installation. L'accès aux données et aux analyses est ensuite facturée à 30€ ou 60€/mois/utilisateur selon la solution choisie (cloud ou on premise). Nous proposons des tarifs réduits en fonction du nombre de capteurs commandés, n'hésitez pas à nous contacter pour demander un devis personnalisé.",
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const toggle = (index) => {
    if (index === open) {
      setOpen(false);
    }
    setOpen(index);
  };

  return (
    <div className="dark:bg-darkBackground">
      <Header />
      <main className="pt-[var(--nav-height)] bg-page-gradient md:pb-[15.6rem]">
        <Container className="pt-[8rem]">
          <Hero>
            <HeroSubtitle className="animate-fade-in [--animation-delay:0ms] opacity-0 translate-y-[-1rem]">
              Développé par des étudiants pour des professionnels
            </HeroSubtitle>
            {/* <Button className="animate-fade-in [--animation-delay:0ms] opacity-0 translate-y-[-1rem]" href="/" variant="secondary" size="small" ><p className="mr-2">Développé par des étudiants pour des professionnels</p> <Arrow /></Button> */}
            <HeroTitle className="animate-fade-in [--animation-delay:200ms] opacity-0 translate-y-[-1rem]">
              Monitorez vos locaux <br />
              avec Celsius
            </HeroTitle>
            <HeroSubtitle className="animate-fade-in [--animation-delay:400ms] opacity-0 translate-y-[-1rem]">
              Economisez de l'argent intelligement en surveillant votre
              <br />
              consomation de chauffage en temps réel et en étant <br />
              alerté rappidement dès qu'un soucis est détecté
            </HeroSubtitle>
            <Button
              className="animate-fade-in [--animation-delay:600ms] opacity-0 translate-y-[-1rem]"
              href="/signin"
              variant="primary"
              size="medium"
            >
              <p className="mr-2">C'est parti</p> <Arrow />
            </Button>
            <div id="Preview" className="pt-[0.6rem]">
              <HeroImage />
            </div>
          </Hero>
        </Container>
      </main>
      <div id="Clients" className="pt-[8.6rem]">
        <Container>
          <Clients />
          <div id="Features-animation" className="pb-[12.6rem]">
            <div
              className={classNames(
                "mask-radial-faded my-[-12.8rem] h-[60-rem] overflow-hidden relative",
                "before:absolute [--color:#7877C6] before:inset-0 before:opacity-[0.4] before:bg-radial-faded",
                "after:absolute after:top-1/2 after:-left-1/2 after:h-[142.8%] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgba(120,_119,_198,_0.4)] dark:after:bg-darkBackground after:bg-white",
              )}
            >
              <StarsIllustration />
            </div>
            <div id="Features" className="pt-[5.6rem]">
              <Hero>
                <HeroTitle className="animate-fade-in [--animation-delay:1400ms] opacity-0 translate-y-[-1rem]">
                  Features
                </HeroTitle>
                <HeroSubtitle className="animate-fade-in [--animation-delay:1600ms] opacity-0 translate-y-[-1rem]">
                  Jetez un oeil aux principales fonctionnalitées de Celsius
                </HeroSubtitle>
              </Hero>
            </div>
            <Features />
          </div>
        </Container>
      </div>
      <div id="Tarifs" data-testid="Tarifs">
        <Container className="pt-[5.6rem] pb-[15.6rem]">
          <Hero>
            <HeroTitle className="animate-fade-in [--animation-delay:1400ms] opacity-0 translate-y-[-1rem]">
              Tarifs
            </HeroTitle>
            <HeroSubtitle className="animate-fade-in [--animation-delay:1600ms] opacity-0 translate-y-[-1rem]">
              2 solutions sont disponibles pour vous procurer Celsius
            </HeroSubtitle>
          </Hero>
          <Prices />
        </Container>
      </div>
      <div id="Questions">
        <Container className="md:pt-[5.6rem] md:pb-[15.6rem]">
          <Hero>
            <HeroTitle className="animate-fade-in [--animation-delay:1400ms] opacity-0 translate-y-[-1rem]">
              Questions
            </HeroTitle>
            <HeroSubtitle className="animate-fade-in [--animation-delay:1600ms] opacity-0 translate-y-[-1rem]">
              Une liste exhaustive de questions qu'on nous pose fréquemment
            </HeroSubtitle>
          </Hero>
          {data.map((item, index) => {
            return (
              <Faq key={index} question={item.question} answer={item.answer} />
            );
          })}
        </Container>
      </div>
      <div id="Contact" className="pt-[5.6rem]">
        <Hero>
          <HeroTitle className="animate-fade-in [--animation-delay:1400ms] opacity-0 translate-y-[-1rem]">Contactez-nous</HeroTitle>
        </Hero>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
