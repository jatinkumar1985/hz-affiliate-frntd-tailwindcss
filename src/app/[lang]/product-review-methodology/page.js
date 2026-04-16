import { notFound } from 'next/navigation';
import React from 'react'

const Meta = {
    meta_title: "Your Picks पर Product Reviews कैसे किए जाते हैं?",
    meta_keyword: "",
    meta_description: "your Picks पर हम Amazon Reviews, Market Trends, Sales Data और Brand Comparison का गहराई से Analysis करके सिर्फ Best, Trusted और Value for Money Products आपके लिए चुनते हैं।",
}

export async function generateMetadata({params}){
    const { lang } = await params;
    let localUrl;
    if (lang === 'en') {
        localUrl = `/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
    } else if (lang === 'hi') {
        localUrl = `/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
    }
  return {
    title: Meta.meta_title,
    description: Meta.meta_description,
    keywords: Meta.meta_keyword,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/product-review-methodology`,
    },
    openGraph: {
      title: Meta.meta_title,
      description: Meta.meta_description,
      url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}`,
      images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
      siteName:process.env.NEXT_PUBLIC_DOMIN_NAME,
    },
  };
}

export default async function Page({params}) {
    const { lang } = await params;

    if (lang !== 'hi') {
        notFound();
    }
    return (
        <>

            <div className='max-w-7xl mx-4 lg:mx-auto py-6 lg:py-6 article-body'>
                <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>हम “योर पिक्स” पर प्रोडक्ट्स का रिव्यू कैसे करते हैं?</h1>
                <h3>1. संक्षिप्त और आधुनिक</h3>
                <p>हम जानते हैं कि शॉपिंग के दौरान सही चुनाव करना कितना ज़रूरी है। इसीलिए, हम Amazon पर यूजर फीडबैक और मार्केट ट्रेंड्स को गहराई से ट्रैक करते हैं ताकि आपकी मेहनत कम हो सके। एक मजबूत डेटा-आधारित चयन प्रक्रिया के जरिए, हम केवल वही प्रोडक्ट्स आप तक पहुंचाते हैं जो अपनी कैटेग्री में शानदार हैं। हमारी सिलेक्शन प्रोसेस कुछ इस प्रकार काम करती है:</p>
                <ul>
                    <li>हम ब्रांड के दावों के बजाय यूजर फीडबैक को प्राथमिकता देते हैं। हम महीनों के रिव्यूज को खंगालते हैं ताकि प्रोडक्ट की किसी छिपी हुई कमी या बड़ी खूबी को पहचान सकें। हमारा ध्यान उन कॉमन पॉइंट्स पर होता है जो बार-बार खरीदारों द्वारा बताए गए हैं। </li>
                    <li>प्रोडक्ट के पुराने प्रदर्शन के साथ-साथ उसकी वर्तमान स्थिति को परखने के लिए हम Amazon पर मौजूद सबसे नए और भरोसेमंद रिव्यूज का विश्लेषण करते हैं, जिससे आपको सबसे सटीक जानकारी मिले।</li>
                </ul>
                <h3>2. बाजार में लोकप्रियता और बिक्री</h3>
                <p>लोकप्रियता अक्सर भरोसे का प्रतीक होती है। हम Amazon के टॉप-सेलिंग चार्ट्स का विश्लेषण करते हैं ताकि जान सकें कि कौन से फीचर्स ग्राहकों को सबसे ज्यादा आकर्षित कर रहे हैं। हाई सेलिंग वॉल्यूम और लगातार अच्छी रेटिंग्स यह दर्शाती हैं कि प्रोडक्ट 'वैल्यू फॉर मनी' है। ऐसे ही विश्वसनीय और सबसे ज्यादा बिकने वाले प्रोडक्ट्स को हम आपके लिए चुनते हैं।</p>
                <h3>3. लोकप्रिय ब्रांड्स की तुलना</h3>
                <p>बेहतरीन चुनाव के लिए हम हर प्रोडक्ट को 3-5 डायरेक्ट कॉम्पिटिटर्स के साथ परखते हैं। हम यह विश्लेषण करते हैं कि एक ब्रांड दूसरे के मुकाबले आपको कितनी अधिक वैल्यू और बेहतर फीचर्स दे रहा है। हमारी लिस्ट में उन्हीं ब्रांड्स को जगह मिलती है जो न केवल क्वालिटी प्रोडक्ट्स देते हैं, बल्कि जिनकी कस्टमर सर्विस और वारंटी पॉलिसी भी सबसे मजबूत होती है।</p>
                <h3>4. आसानी से प्रोडक्ट्स की विशेषताएं समझाना</h3>
                <p>हमारा कंटेंट केवल एक्सपर्ट्स के लिए नहीं, बल्कि हर तरह के यूजर के लिए है। हम तकनीकी खूबियों को सबसे आसान भाषा में समझाते हैं। उदाहरण के लिए, हम सिर्फ बैटरी का साइज या मोटर की पावर नहीं बताते, बल्कि यह समझाते हैं कि वे आपकी रोजमर्रा की जरूरतों को कैसे पूरा करेंगे। हमारा मकसद यह सुनिश्चित करना है कि आपको वही जानकारी मिले जिसे आप असल में तलाश रहे हैं।</p>
                <h3>5. सटीक रिव्यू और लॉन्ग-टर्म रेटिंग</h3>
                <p>रिव्यूज के मामले में हम पूरी सावधानी बरतते हैं ताकि आप गुमराह न हों। हम केवल उन्हीं प्रोडक्ट्स पर भरोसा करते हैं जिनकी रेटिंग लंबे समय से स्थिर रही हो। अगर हमें कोई ऐसा प्रोडक्ट दिखता है जिसकी रेटिंग तो बहुत हाई है लेकिन उसे खरीदने वाले या रिव्यू देने वाले लोग बहुत कम हैं, तो हम उसे अपनी लिस्ट से बाहर रखते हैं। हमारा मकसद आपको केवल असली और भरोसेमंद फीडबैक के आधार पर सुझाव देना है।</p>
            </div>
        </>
    )
}
