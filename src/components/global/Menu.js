'use client';
import { useState } from 'react';
import GlobalLink from './GlobalLink';
import { lowerText } from '@/components/utils/dataLayer';
// import { useMenuData } from '../hooks/useMenuData';

export default function Menu({ onClose, HeaderNavigationData, localUrl }) {
  // const { content, loading } = useMenuData();
  // Use a state to store which category is open.
  // It will store the index of the open category, or null if none are open.
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };    
  return (
    <>
      {HeaderNavigationData?.data?.category.map((item, index) => (
        <div key={index}>
          <GlobalLink
              href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${item.category_slug}`} // Assuming item.url exists for direct link, provide a fallback
              onClick={() => onClose(false)}
              eventName="navigation_interaction"
              data={{
                uid: 'na',
                usertype: 'guest',
                cta_text: lowerText(item.category_name),
                select_type: 'header',
                section_name: lowerText(item.category_name),
              }}
              className="flex w-full items-center font-semibold justify-between border-b border-slate-100 py-4 text-sm font-dm-serif text-gray-900 hover:text-red-700"
            >
              {item?.category_name}
              {/* You might want to add an icon here if it's a direct link and needs visual indication */}
            </GlobalLink>
            {/* <ul className="list-none">
                {item.sub_category.map((subItem, subIndex) => (
                  <li key={subIndex} className="py-3 border-b border-slate-100">
                    <GlobalLink
                      href={`/${item.category_slug}/${subItem.category_slug}`}
                      onClick={() => onClose(false)}
                      eventName="navigation_interaction"
                      data={{
                        uid: 'na',
                        usertype: 'guest',
                        cta_text: `${subItem.category_name?.toLowerCase()}`,
                        select_type: 'header',
                        section_name: `${subItem.category_name?.toLowerCase()}`,
                      }}
                      className="text-gray-900 hover:text-red-700 text-sm inline-flex items-center"
                    >
                      <ArrowRightIcon className="size-2 mr-2" /> {subItem.category_name}
                    </GlobalLink>
                  </li>
                ))}
              </ul> */}
        </div>
      ))}
    </>
  );
}
