import GlobalLink from '../global/GlobalLink';
import Rating from './Rating';
import VerticalThumbnailSlider from './VerticalThumbnailSlider';
import LazyMedia from '../global/LazyMedia';
import TrusCardBottom from './TrusCardBottom';
import WindowScrollReveal from './WindowScrollReveal';

const normalizeAmount = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : null;
};

const calculateDiscountFromSaving = (currentPrice, savingAmount) => {
  const price = normalizeAmount(currentPrice);
  const saving = normalizeAmount(savingAmount);
  if (price === null || saving === null) return null;

  const original = price + saving;
  if (original <= 0) return null;

  return Math.round((saving / original) * 100);
};

const getBrand = (allSpecs = []) => {
  const brandObj = allSpecs.find(item => item.key === 'Brand');
  return brandObj && typeof brandObj.value === "string"
    ? brandObj.value.toLowerCase()
    : 'na';
};

const hasRenderablePricing = (liveProduct) => {
  return [
    liveProduct?.Price,
    liveProduct?.DisplayPrice,
    liveProduct?.SavingPrice,
    liveProduct?.SavingDisplayPrice,
  ].some((value) => normalizeAmount(value) !== null);
};

function ProductCard({ item, id, tracking_tag, liveProduct }) {
  const incrementedId = id + 1;
  const formattedId = incrementedId < 10 ? `0${incrementedId}` : incrementedId;
  // console.log(liveProduct?.Price,
  //   liveProduct?.DisplayPrice,
  //   liveProduct?.SavingPrice,
  //   liveProduct?.SavingDisplayPrice,item.amazon_product_id,'price');
  
  if (!hasRenderablePricing(liveProduct)) {
    return null;
  }
  
  // ✅ Prefer live API data where available, fall back to item prop
  const title = liveProduct?.Title || item.title;
  const livePrice = normalizeAmount(liveProduct?.Price);
  const liveDisplayPrice = normalizeAmount(liveProduct?.DisplayPrice);
  const liveSaving = normalizeAmount(liveProduct?.SavingPrice);
  const liveSavingDisplayPrice = normalizeAmount(liveProduct?.SavingDisplayPrice);
  // console.log(livePrice,'livePrice');
  
  const price = livePrice ?? liveDisplayPrice;
  const savingAmount = liveSaving ?? liveSavingDisplayPrice;
  const mrp = price !== null && savingAmount !== null
    ? price + savingAmount
    : liveDisplayPrice;
  const discountPercentage = price !== null && savingAmount !== null
    ? calculateDiscountFromSaving(price, savingAmount)
    : null;
  
  return (
    <>
      <div className="overflow-hidden mb-6 lg:mb-8 rounded-lg bg-white border border-dashed border-slate-400 shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <div className="px-0 py-0">
          <div className='relative'>
            <div className='w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center absolute top-4 z-2 lg:top-8 left-4 lg:left-8 bg-pink-600 text-white font-bold lg:font-extrabold text-sm lg:text-3xl'>
              {formattedId}
            </div>
            <VerticalThumbnailSlider item={item} />
            <div className='px-4 lg:px-8 pb-4'>
              <h3 className="text-xl lg:text-2xl mb-3 sm:text-2xl leading-7 sm:leading-[1.3] font-extrabold text-gray-900 sm:tracking-tight">
                <WindowScrollReveal>
                  <GlobalLink
                    href={item.amazon_url + tracking_tag}
                    rel="nofollow sponsored"
                    target='_blank'
                    className="hover:text-pink-500 hover:underline"
                  >
                    {title} {/* ✅ Now uses live title if available */}
                  </GlobalLink>
                </WindowScrollReveal>
              </h3>
              <div className='mb-2 flex items-start justify-start gap-4'>
                <div className='w-20'>
                  <LazyMedia
                    type="image"
                    alt={item?.alt}
                    width={603}
                    height={182}
                    className="w-[70px] h-auto"
                    src="https://www.jagranimages.com/images/Amazon_logo.svg"
                  />
                </div>
                {item.rating && <Rating rating={item.rating} size="xs" />}
              </div>
              <div className='flex items-center justify-between gap-4'>
                <div>
                  <div className="text-2xl lg:text-3xl font-extrabold text-pink-600 flex items-center gap-1">
                    <sup className="sup font-semibold text-sm lg:text-lg">₹</sup>{price}
                    {discountPercentage ? (
                      <p className="text-xs font-semibold text-gray-600">{discountPercentage}% off</p>
                    ) : null}
                  </div>
                  {mrp !== null && (
                    <p className="text-xs font-semibold text-gray-600">
                      M.R.P: <span style={{ textDecoration: 'line-through' }}>₹{mrp}</span>
                    </p>
                  )}
                </div>
                <GlobalLink
                  href={item.amazon_url + tracking_tag}
                  rel="nofollow sponsored"
                  target='_blank'
                  className="rounded-full inline-block bg-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  eventName="purchase"
                  data={{
                    language: "english",
                    category: item?.category?.category_name,
                    sub_category: item?.subcategory?.category_name,
                    page_type: "article detail",
                    content_group: "Item Details Page",
                    ecommerce: {
                      transaction_id: "",
                      value: "",
                      tax: "",
                      shipping: "",
                      currency: "INR",
                      coupon: "",
                      customer_type: "new",
                      items: [{
                        item_id: item?.id,
                        item_name: item?.title?.toLowerCase(),
                        affiliation: "",
                        coupon: "",
                        discount: "",
                        index: 0,
                        item_brand: getBrand(item?.all_specifications),
                        item_category: item?.category?.category_name,
                        item_category2: item?.subcategory?.category_name,
                        item_category3: "",
                        item_category4: "",
                        item_category5: "",
                        item_list_id: "related_products",
                        item_list_name: "Related Products",
                        item_variant: "",
                        location_id: "",
                        price: item?.price,
                        quantity: ""
                      }]
                    }
                  }}
                >
                  Buy Now
                </GlobalLink>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: item.description }}
                className="text-md mt-4 leading-7 article-body"
              />
              {item.author_rating !== '0' && (
                <div className='mb-4 flex items-center gap-2 text-lg bg-gray-50 w-full px-4 py-3 rounded border border-gray-200'>
                  <span className='font-bold'>Expert Rating:</span>
                  <span>{item.author_rating}/10</span>
                </div>
              )}
              <div className='pb-4'>
                {item.specifications && (
                  <div className="max-w-none py-base py-4">
                    <h3 className='text-base font-bold mb-2'>Specifications:</h3>
                    <ul className='list-none'>
                      {Object.entries(item.specifications).map(([key, value]) => (
                        <li key={key} className='text-sm border border-gray-200 -mb-px flex'>
                          <strong className='mr-1 py-2 inline-flex w-1/2 lg:w-1/3 px-4 border-r border-gray-200'>{key}</strong>
                          <span className='py-2 px-2 inline-flex w-1/2'>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="max-w-none grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {item.pros && (
                    <div className='py-4 px-4 bg-green-50 border border-green-200/90'>
                      <h3 className='text-base font-bold mb-2'>Reasons to buy:</h3>
                      {Object.entries(item.pros).map(([key, value]) => (
                        <p key={key} className='text-sm mb-1 flex'>
                          <strong className='text-green-700 shrink-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 inline-block mr-1" viewBox="0 0 16 16">
                              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                          </strong>
                          <span>{value}</span>
                        </p>
                      ))}
                    </div>
                  )}
                  {item.cons && (
                    <div className='py-4 px-4 bg-pink-50 border border-pink-100'>
                      <h3 className='text-base font-bold mb-2'>Reason to avoid:</h3>
                      {Object.entries(item.cons).map(([key, value]) => (
                        <p key={key} className='text-sm mb-1 flex'>
                          <strong className='text-pink-700 shrink-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 inline-block mr-1" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                          </strong>
                          <span>{value}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {/* {amazon2 &&
                  <div className="bg-gray-50 p-4 lg:p-8 border-t border-dashed border-slate-400">
                    <div className="flex space-x-2 lg:space-x-4">
                      <div className='w-[75px]'>
                        <a href={amazon2} rel="nofollow sponsored" target='_blank'>
                          <LazyMedia
                            type="image"
                            src={products[item.amazon_product_id]?.SmallImage}
                            alt={item.alt}
                            width={75}
                            height={75}
                            className=""
                            placeholderHeight="w-[75px] h-[75px]"
                          />
                        </a>
                      </div>
                      <div className="flex flex-auto flex-col w-[calc(100%-75px)]">
                        <div>
                          <h4 className="font-bold text-gray-900 hover:text-pink-700 leading-5 lg:leading-6 text-xs lg:text-sm">
                            <a href={amazon2} rel="nofollow sponsored" target='_blank'>{products[item.amazon_product_id]?.Title || 0}</a>
                          </h4>
                          <div className="flex items-center">
                            <p className="mt-2 text-lg lg:text-xl font-extrabold text-pink-600"><sup className="sup font-semibold text-xs">₹</sup>{products[item.amazon_product_id]?.Price}</p>
                            <p className="mt-2 text-xs font-semibold text-gray-600 ml-2">M.R.P: <span style={{ textDecoration: 'line-through' }}>₹{totolprice}</span></p>
                            <p className="mt-2 text-xs font-semibold text-gray-600 ml-2">{products[item.amazon_product_id]?.Discount}% off</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-1 items-end">
                          <dl className="flex text-sm">
                            <div className="flex items-center">
                              <LazyMedia
                                type="image"
                                src="https://www.jagranimages.com/images/Amazon_logo.svg"
                                alt={item.alt}
                                width={603}
                                height={182}
                                className="w-[70px] h-auto"
                                placeholderHeight="w-[70px] h-auto"
                              />
                            </div>
                            <div className="flex pl-4 sm:pl-6">
                              <GloabalLink
                                href={amazon2}
                                rel="nofollow sponsored"
                                target='_blank'
                                className="rounded-full bg-pink-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                              >Get This</GloabalLink>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {id === 1 && <TrusCardBottom />}
    </>
  );
}

// Fetch on the server so live product pricing is part of the initial HTML.
export default async function Products({ ArticleProducts, tracking_tag, liveProducts }) {
  const productsObj = ArticleProducts?.data?.products;
  const rows = productsObj?.rows || [];
  const visibleRows = rows.filter((item) =>
    hasRenderablePricing(liveProducts?.[item.amazon_product_id])
  );

  // if (!ArticleProducts || !rows.length) return null;
  // const productIds = rows
  //   .map((row) => row.amazon_product_id)
  //   .filter(Boolean)
  //   .join(',');

  // const liveProducts = await LiveProductsService({ local, productIds });
  if (!visibleRows.length) return null;

  return (
    <div className="max-w-2xl mx-auto py-6 lg:py-10">
      {visibleRows.map((item, idx) =>
        <ProductCard
          key={item?.id ?? idx}
          item={item}
          id={idx}
          tracking_tag={tracking_tag}
          liveProduct={liveProducts[item.amazon_product_id]} // ✅ Pass per-product live data
        />
      )}
    </div>
  );
}
