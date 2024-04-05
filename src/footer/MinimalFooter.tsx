import React, {PropsWithChildren} from 'react';
import clsx from 'clsx';
import {DatalayerGreenIcon} from '../../react';
import {Stack, Text, useTheme} from '@primer/react-brand';
import {BaseProps} from './component-helpers';

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/footer/colors-with-modes.css'

/**
 * Main Stylesheet (as a CSS Module)
 */
import styles from './MinimalFooter.module.css'

export const MinimalFooterSocialLinks = [
  'twitter',
  'github',
  'linkedin',
//  'youtube',
//  'facebook',
//  'twitch',
//  'tiktok'
] as const

type SocialLinks = typeof MinimalFooterSocialLinks[number]

export type MinimalFooterProps = {
  /**
   * An array of social links to be displayed in the footer.
   */
  socialLinks?: SocialLinks[] | false
  /**
   * The href for the GitHub logo.
   */
  logoHref?: string
  /**
   * The copyright statement to be displayed in the footer.
   * If not provided, the copyright statement will be the default GitHub copyright statement.
   */
  copyrightStatement?: string | React.ReactElement
} & BaseProps<HTMLElement>

function Root({
  className,
  children,
  copyrightStatement,
  logoHref = 'https://datalayer.io',
  socialLinks,
  ...rest
}: PropsWithChildren<MinimalFooterProps>) {
  // find Footer.Footnotes children
  const footerFootnoteChild = () => {
    const footnotes = React.Children.toArray(children).find(child => {
      if (!React.isValidElement(child)) {
        return false
      }

      if (child.type && child.type === Footnotes) {
        return true
      }
    })
    return footnotes
  }

  /**
   * Renders a maximum of 5 links.
   * If more than 5 links are required, we should encourage usage of Footer instead.
   */
  const LinkChildren = React.Children.toArray(children)
    .filter(child => {
      // if not valid element
      if (React.isValidElement(child)) {
        if (child.type === Link) {
          return child
        }
      }
    })
    .slice(0, 5)

  const currentYear = new Date().getFullYear()

  return (
    <footer className={clsx(styles.Footer, className)} {...rest}>
      {footerFootnoteChild()}
      <SocialLogomarks socialLinks={socialLinks} logoHref={logoHref} />
      <section>
        <div className={styles['Footer__legal-and-links']}>
          <div className={styles['Footer__container']}>
            <Stack
              direction={{narrow: 'vertical', regular: 'horizontal'}}
              gap="normal"
              padding="none"
              justifyContent="space-between"
            >
              <Stack
                padding="none"
                gap="condensed"
                justifyContent={{
                  narrow: 'center',
                  regular: 'flex-end'
                }}
                direction={{
                  narrow: 'vertical',
                  regular: 'horizontal'
                }}
                className={styles['Footer__links']}
              >
                <>{LinkChildren}</>
              </Stack>
              <Text as="p" size="300" variant="muted" className={styles['Footer__copyright']}>
                {copyrightStatement ? copyrightStatement : `\u00A9 ${currentYear} Datalayer, Inc. All rights reserved.`}
              </Text>
            </Stack>
          </div>
        </div>
      </section>
    </footer>
  )
}

type FootnoteProps = BaseProps<HTMLElement>

function Footnotes({children, className}: PropsWithChildren<FootnoteProps>) {
  const styledChildren = React.Children.map(children, child => {
    // if not valid element
    if (!React.isValidElement(child)) {
      return child
    }

    if (child.type && child.type === Text) {
      return React.cloneElement(child as React.ReactElement, {
        as: 'p',
        variant: 'muted',
        size: 200,
        className: clsx(styles['Footer__terms-item'], child.props.className),
        ...child.props // allow overrides for escape hatch
      })
    }
  })

  return (
    <section className={styles.Footer__container}>
      <div className={clsx(styles.Footer__terms, className)}>{styledChildren}</div>
    </section>
  )
}

type SocialLogomarksProps = {
  socialLinks?: SocialLinks[] | false
  logoHref?: string
}

function SocialLogomarks({socialLinks, logoHref}: SocialLogomarksProps) {
  const {colorMode} = useTheme()

  const socialLinkData = [
    {
      name: 'twitter',
      fullName: 'Twitter',
      url: 'https://twitter.com/datalayerio',
      icon: 'https://github.githubassets.com/images/modules/site/icons/footer/twitter.svg',
      iconWidth: 22,
      iconHeight: 18
    },
    {
      name: 'github',
      fullName: 'GitHub',
      url: 'https://github.com/datalayer',
      icon: 'https://github.githubassets.com/images/modules/site/icons/footer/github-mark.svg',
      iconWidth: 20,
      iconHeight: 20
    },
    {
      name: 'linkedin',
      fullName: 'LinkedIn',
      url: 'https://www.linkedin.com/company/datalayer',
      icon: 'https://github.githubassets.com/images/modules/site/icons/footer/linkedin.svg',
      iconWidth: 19,
      iconHeight: 18
    },
    /*
    {
      name: 'youtube',
      fullName: 'YouTube',
      url: 'https://www.youtube.com/datalayer',
      icon: 'https://github.githubassets.com/images/modules/site/icons/footer/youtube.svg',
      iconWidth: 23,
      iconHeight: 16
    },
    {
      name: 'facebook',
      fullName: 'Facebook',
      url: 'https://www.facebook.com/GitHub',
      icon: 'https://github.githubassets.com/images/modules/site/icons/footer/facebook.svg',
      iconWidth: 18,
      iconHeight: 18
    },
    {
      name: 'twitch',
      fullName: 'Twitch',
      url: 'https://www.twitch.tv/github',
      icon: 'https://github.githubassets.com/images/modules/site/icons/footer/twitch.svg',
      iconWidth: 18,
      iconHeight: 18
    },
    {
      name: 'tiktok',
      fullName: 'TikTok',
      url: 'https://www.tiktok.com/@github',
      icon: 'https://github.githubassets.com/images/modules/site/icons/footer/tiktok.svg',
      iconWidth: 18,
      iconHeight: 18
    }
    */
  ]

  const renderLink = (link: typeof socialLinkData[number]) => {
    return (
      <li key={link.name}>
        <a
          href={link.url}
          data-analytics-event={`{"category":"Footer","action":"go to ${link.fullName}","label":"text:${link.name}"}`}
        >
          <img
            className={styles['Footer__social-icon']}
            src={link.icon}
            height={link.iconHeight}
            width={link.iconWidth}
            loading="lazy"
            decoding="async"
            alt=""
          />
          <span className="visually-hidden">GitHub on {link.fullName}</span>
        </a>
      </li>
    )
  }

  return (
    <section className={clsx(styles['Footer__logomarks'])}>
      <div className={styles['Footer__container']}>
        <Stack
          alignItems="center"
          direction={{narrow: 'vertical', regular: 'horizontal'}}
          gap="normal"
          padding="none"
          justifyContent="space-between"
        >
          <div>
            <a
              href={logoHref}
              aria-label="Go to Datalayer homepage"
            >
              <DatalayerGreenIcon size="medium" colored/>
            </a>
          </div>
          {socialLinks !== false ? (
            <ul className={styles['Footer__social-links']}>
              {socialLinkData.map((link: typeof socialLinkData[number]) => {
                if (socialLinks && !socialLinks.includes(link.name as SocialLinks)) {
                  return null
                }
                return renderLink(link)
              })}
            </ul>
          ) : (
            <></>
          )}
        </Stack>
      </div>
    </section>
  )
}

type LinkProps<C extends React.ElementType> = BaseProps<C> & {as?: 'a' | 'button'} & Omit<
    React.ComponentPropsWithoutRef<C>,
    keyof C
  >

const Link = <C extends React.ElementType = 'a'>({as, children, ...rest}: PropsWithChildren<LinkProps<C>>) => {
  const Component = as || 'a'
  return (
    <Component
      className={styles['Footer__link']}
      data-analytics-event={
        (rest as any)['href'] ? `{"category":"Footer","action":"go to ${(rest as any)['href']}","label":"text:${children}"}` : undefined
      }
      {...rest}
    >
      <Text variant="muted" size="300">
        {children}
      </Text>
    </Component>
  )
}

/**
 * Use MinimalFooter to render a global footer on all GitHub pages.
 * @see https://primer.style/brand/components/MinimalFooter
 */
export const MinimalFooter = Object.assign(Root, {
  Footnotes,
  Link
})
