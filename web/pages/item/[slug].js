import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import {PortableText} from '@portabletext/react'
import client from '../../client'
import Container from '../../components/container'
import DesignerInfo from '../../components/designer-info'
import Images from '../../components/images'
import ItemInfo from '../../components/item-info'
import Layout from '../../components/layout'
import Meta from '../../components/meta'
import Tags from '../../components/tags'
import { getCurrentQuery, itemQuery } from '../../lib/queries'
import { urlFor } from '../../lib/sanity'

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit('max').auto('format')}
        />
      )
    }
  }
}

export default function Item({ item }) {

  const router = useRouter()

  if (!router.isFallback && !item.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {item.title} | Ephemera
                </title>
              </Head>
              <Meta
                path={`/item/${item.slug}`}
                title={item.title}
                image={item.mainImage}
                type="article"
                publishedTime={item.publishedAt}
              />
              <section>
                <h1>{item.title}</h1>

                <ItemInfo
                  width={item.width}
                  height={item.height}
                  date={item.artworkDate}
                />
                
                {item.designer && (
                  <DesignerInfo
                    firstName={item.designer.firstName}
                    lastName={item.designer.lastName}
                    slug={item.designer.slug}
                  />
                )}

                <PortableText
                  value={item.notes}
                  components={ptComponents}
                />

                <Tags
                  tags={[item.tags, item.typefaces]}
                />
              </section>

              <section>
                <Images
                  images={item.images}
                />
              </section>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(getCurrentQuery("item"))
  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params
  const item = await client.fetch(itemQuery, { slug })
  return {
    props: {
      item
    }
  }
}