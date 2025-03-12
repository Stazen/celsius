import { ArcLogo } from "../../public/images/landingPage/clients/arcLogo";
import { CashappLogo } from "../../public/images/landingPage/clients/cashappLogo";
import { DescriptLogo } from "../../public/images/landingPage/clients/descriptLogo";
import { MercuryLogo } from "../../public/images/landingPage/clients/mercuryLogo";
import { RampLogo } from "../../public/images/landingPage/clients/rampLogo";
import { RaycastLogo } from "../../public/images/landingPage/clients/raycastLogo";
import { RemoteLogo } from "../../public/images/landingPage/clients/remoteLogo";
import { RetoolLogo } from "../../public/images/landingPage/clients/retoolLogo";
import { RexLogo } from "../../public/images/landingPage/clients/rexLogo";
import { RunwayLogo } from "../../public/images/landingPage/clients/runwayLogo";
import { SupercelLogo } from "../../public/images/landingPage/clients/supercelLogo";
import { VercelLogo } from "../../public/images/landingPage/clients/vercelLogo";

export const Clients = () => {
    return (
        <>

            <p className="text-md text-center md:text-lg mb-12">
                <span className="text-primary-grey">Nous sommes soutenus par plusieurs entreprises</span>
                <br />De petites PME à des grandes entreprises établies
                </p>

            <div className="flex [&_svg]:w-[16rem] flex-wrap gap-x-6 gap-y-8 md:[&_svg]:basis-[calc(16.66%-20px)] [&_svg]:basis-[calc(50%-12px)] justify-around">
                <RampLogo className="dark:block hidden" />
                <RexLogo />
                <VercelLogo className="dark:block hidden" />
                <DescriptLogo className="dark:block hidden" />
                <CashappLogo className="dark:block hidden" />
                <SupercelLogo />
                <MercuryLogo className="dark:block hidden" />
                <RetoolLogo className="dark:block hidden" />
                <RemoteLogo />
                <ArcLogo className="dark:block hidden" />
                <RaycastLogo className="dark:block hidden" />
                <RunwayLogo />
            </div>
        </>
    )
};