export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  headerText,
  logo{asset->{_id,url}},
  hero{heading,subheading,backgroundImage{asset->{_id,url}}},
  about,
  contact,
  social
}`

export const allServicesQuery = `*[_type == "service"] | order(featured desc, title asc){
  _id,
  title,
  slug,
  excerpt,
  price,
  duration,
  featured,
  image{asset->{_id,url}}
}`

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  price,
  duration,
  featured,
  image{asset->{_id,url}},
}`

export const blogListQuery = `*[_type == "blogPost" && publishDate <= now()] | order(publishDate desc){
  _id, title, slug, excerpt, coverImage{asset->{_id,url}}, author->{name}
}`

export const blogBySlugQuery = `*[_type == "blogPost" && slug.current == $slug && publishDate <= now()][0]{
  _id, title, slug, excerpt, body, coverImage{asset->{_id,url}}, author->{name}
}`
