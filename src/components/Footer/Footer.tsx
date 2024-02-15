"use client";

import styles from "./Footer.module.scss";

import Image from "next/image";
import Link from "next/link";

import { useMilitaryPath } from "@/hooks/useMilitaryPath";

import Five from "@/../public/logo.png";
import Phone from "@/../public/phone.png";
import Mail from "@/../public/mail.png";

import { footer_links } from "@/static_store/footer_links";

export default function Footer() {
  const isMilitary = useMilitaryPath();
  return (
    <footer
      className={`${styles.root} ${isMilitary ? styles.military_root : ""}`}
    >
      <article className={styles.wrapper}>
        <div className={styles.logo_block}>
          <Image alt="FiVe" src={Five} width={160} height={112} />
          <div className={styles.social_icons}>
            {footer_links.socialIcons.map((icon) => {
              return (
                <a
                  key={icon.alt}
                  href={icon.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    alt={icon.alt}
                    src={icon.image}
                    width={40}
                    height={40}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.info_inner_div}>
            <h5>Перейти до</h5>
            {footer_links.anchorLinks.map((anchorLink) => {
              return (
                <Link key={anchorLink.title} href={anchorLink.href}>
                  {anchorLink.title}
                </Link>
              );
            })}
          </div>
          <div className={styles.info_inner_div}>
            <h5>Про компанію</h5>
            {footer_links.learnMore.map((moreLink) => {
              return (
                <Link key={moreLink.title} href={moreLink.href}>
                  {moreLink.title}
                </Link>
              );
            })}
          </div>
          <div className={styles.info_inner_div}>
            <h5>Terms of Agreement</h5>
            {footer_links.termsOfAgreement.map((term) => {
              return (
                <Link key={term.title} href={term.href}>
                  {term.title}
                </Link>
              );
            })}
          </div>
          <div className={styles.info_inner_div}>
            <h5>Зв'язатись з нами</h5>
            <a href="tel:0953067544" className={styles.contact_a_div}>
              <Image alt="Phone Number" width={22} height={22} src={Phone} />
              <p>+38(067) 676-76-76</p>
            </a>
            <a href="mailto:example@gmail.com" className={styles.contact_a_div}>
              <Image alt="Mail" width={22} height={22} src={Mail} />
              <p>example@gmail.com</p>
            </a>
          </div>
        </div>
      </article>
      <p className={styles.copy}>© 2024 FiVe. All right reserved.</p>
    </footer>
  );
}
