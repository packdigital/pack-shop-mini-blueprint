/*
 * STOREFRONT API QUERIES -----------------------------------------------------
 */

// Docs: https://shopify.dev/docs/api/storefront/latest/objects/Shop

export const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      id
      name
      description
      brand {
        logo {
          image {
            url
          }
        }
      }
    }
  }
` as const;

const POLICY_FRAGMENT = `#graphql
  fragment Policy on ShopPolicy {
    handle
    id
    title
    body
    __typename
  }
` as const;

export const SHOP_QUERY = `#graphql
  query ($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    shop {
      description
      moneyFormat
      name
      paymentSettings {
        acceptedCardBrands
        cardVaultUrl
        countryCode
        currencyCode
        enabledPresentmentCurrencies
        supportedDigitalWallets
        shopifyPaymentsAccountId
      }
      primaryDomain {
        host
        sslEnabled
        url
      }
      privacyPolicy {
        ...Policy
      }
      refundPolicy {
        ...Policy
      }
      shippingPolicy {
        ...Policy
      }
      shipsToCountries
      termsOfService {
        ...Policy
      }
    }
  }
  ${POLICY_FRAGMENT}
` as const;
