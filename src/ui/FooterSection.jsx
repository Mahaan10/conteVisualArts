import { Link } from "react-router-dom";
import {
  createTheme,
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  ThemeProvider,
} from "flowbite-react";
import { PiInstagramLogo, PiTelegramLogo } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa6";

const customTheme = createTheme({
  footer: {
    root: {
      base: "!bg-inherit rounded-none",
    },
    groupLink: {
      base: "text-black",
      link: {
        base: "me-4 !mr-0",
        href: "hover:opacity-80 opacity-50 hover:no-underline",
      },
    },
    title: {
      base: "text-base md:text-lg",
    },
    brand: {
      img: "mr-0 h-32",
    },
    icon: {
      base: "text-inherit",
      size: "w-10 h-10 bg-almond-cookie hover:bg-golden-sand dark:hover:bg-purple-plumeria p-2 rounded-full dark:bg-dark-purple",
    },
  },
});

function FooterSection() {
  return (
    <div className="border-t border-light-shade-yellow dark:border-moderate-violet transition-colors duration-300">
      <div className="flex flex-col overflow-hidden">
        <div className="mb-5">
          <img
            src="images/footer.png"
            loading="lazy"
            width="1440"
            height="400"
            alt=""
            className="object-cover w-full"
          />
        </div>
        <ThemeProvider theme={customTheme}>
          <Footer container>
            <div className="w-full">
              <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 px-5 sm:px-10">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
                  <div>
                    <FooterTitle title="دوره های پرطرفدار" />
                    <FooterLinkGroup col>
                      <FooterLink href="/courses/portrait">
                        نقاشی چهره
                      </FooterLink>
                      <FooterLink href="/courses/nature">
                        نقاشی طبیعت
                      </FooterLink>
                      <FooterLink href="/courses/pictures">
                        نقاشی از روی عکس
                      </FooterLink>
                      <FooterLink href="/courses/so-realism">
                        نقاشی به سبک سورئالیسم
                      </FooterLink>
                      <FooterLink href="/courses/realism">
                        نقاشی به سبک رئالیسم
                      </FooterLink>
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="دسترسی سریع" />
                    <FooterLinkGroup col>
                      <FooterLink href="/courses/portrait">
                        همه دوره ها
                      </FooterLink>
                      <FooterLink href="/courses/portrait">
                        آثار هنرجویان
                      </FooterLink>
                      <FooterLink href="/courses/portrait">
                        اخبار و رویدادها
                      </FooterLink>
                      <FooterLink href="/courses/portrait">
                        درباره ما
                      </FooterLink>
                      <FooterLink href="/courses/portrait">
                        ارتباط با ما
                      </FooterLink>
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="راهنما و پشتیبانی" />
                    <FooterLinkGroup col>
                      <FooterLink href="/courses/portrait">
                        سوالات متداول(FAQ)
                      </FooterLink>
                      <FooterLink href="/courses/portrait">
                        قوانین و مقررات
                      </FooterLink>
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="راه های ارتباطی" />
                    <div className="flex flex-col gap-y-4 text-sm">
                      <div className="flex gap-x-2 opacity-50">
                        <span>تلفن پشتیبانی:</span>
                        <Link to="">021-66957831</Link>
                      </div>
                      <div className="flex gap-x-2 opacity-50">
                        <span>فکس:</span>
                        <Link to="">021-66958237</Link>
                      </div>
                      <div className="flex gap-x-2 opacity-50">
                        <span>ایمیل:</span>
                        <Link to="">conteschool@yahoo.com</Link>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <FooterIcon href="/courses" icon={PiInstagramLogo} />
                        <FooterIcon href="/courses" icon={PiTelegramLogo} />
                        <FooterIcon href="/courses" icon={FaWhatsapp} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 mt-4 sm:mt-0">
                  <div>
                    <FooterBrand
                      href="/"
                      src="images/Logo.jpg"
                      alt="Conte Logo"
                    />
                  </div>
                  <div className="w-12 h-12 flex gap-x-2">
                    <img src="images/zarin.png" alt="" />
                    <img src="images/enamad.jpg" alt="" />
                  </div>
                </div>
              </div>
              <FooterDivider />
              <div className="flex gap-y-2 items-center justify-center">
                <FooterCopyright by="کلیه حقوق متعلق به آموزشگاه کًنته می باشد." />
              </div>
            </div>
          </Footer>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default FooterSection;
