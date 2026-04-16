import { notFound } from 'next/navigation';
import React from 'react'

const Meta = {
    meta_title: "हमारे Selection Standards: HerZindagi पर Best Products कैसे चुनते हैं",
    meta_keyword: "",
    meta_description: "बेहतर Lifestyle और Smart Home के लिए HerZindagi पर हम सिर्फ Trusted Brands, Real Amazon Reviews और High-Utility, Value for Money Products ही Recommend करते हैं।",
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
      index: true,
      follow: true,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/esting-standards`,
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
                <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>हमारे चयन मानक: हम उत्पादों का चुनाव कैसे करते हैं?</h1>
                <p>बेहतर लाइफस्टाइल और स्मार्ट होम के लिए सही चुनाव जरूरी है। HerZindagi पर हम ऑनलाइन उपलब्ध हजारों प्रोडक्ट्स में से केवल बेस्ट को छांटते हैं ताकि आपको मिले बेहतरीन क्वालिटी। यहां जानिए कि हम आपके लिए प्रोडक्ट्स का चुनाव कैसे करते हैं:</p>
                <h3>1. ब्रांड का भरोसा और विश्वसनीयता</h3>
                <p>किसी भी प्रोडक्ट का चयन करने से पहले हम देखते हैं कि लोग उस ब्रांड पर कितना भरोसा करते हैं। हम सिर्फ उन कंपनियों को चुनते हैं जो भरोसेमंद हैं और क्वालिटी के मामले में कोई समझौता नहीं करतीं। हमारे लिए यह जरूरी है कि ब्रांड क्वालिटी मैन्युफैक्चरिंग और शानदार आफ्टर-सेल्स सर्विस का ट्रैक रिकॉर्ड रखें। हमारा मकसद आपको ऐसे ब्रांड्स से जोड़ना है जो हर कदम पर अपने ग्राहकों के साथ खड़े रहते हैं और आपको 'वैल्यू फॉर मनी' का अनुभव देते हैं।</p>
                <h3>2. लोगों के बीच लंबे समय से लोकप्रिय</h3>
                <p>सिर्फ दिखावे या ट्रेंड के बजाय, हम ब्रांड के लंबे समय के ट्रैक रिकॉर्ड पर भरोसा करते हैं। हम यह देखते हैं कि ब्रांड के पिछले प्रोडक्ट्स मार्केट में कितने सफल रहे और उनकी खासियत क्या रही। हम उन ब्रांड्स को चुनते हैं जिन्होंने समय के साथ खुद को बेहतर बनाया है। इससे आपको यह फैसला लेने में आसानी होती है कि नया प्रोडक्ट पिछले वाले से कितना अलग है और क्या उस पर पैसे खर्च करना समझदारी है।</p>
                <h3>3. संक्षिप्त और सीधा</h3>
                <p>प्रोडक्ट की असली परख उसके इस्तेमाल के बाद ही होती है। इसीलिए, हम Amazon पर मौजूद हजारों वेरिफाइड रिव्यूज और रेटिंग्स को फिल्टर करते हैं। हम उन मुख्य पॉइंट्स (जैसे ड्यूरेबिलिटी और आफ्टर-सेल्स सर्विस) को गहराई से समझते हैं जिनके बारे में ग्राहकों ने सबसे ज्यादा चर्चा की है। यह प्रक्रिया सुनिश्चित करती है कि आप वही चुनें जो असल जिंदगी में बेहतरीन प्रदर्शन दे सके।</p>
                <h3>4. जो वाकई में हो काम का</h3>
                <p>हमारा काम सिर्फ प्रोडक्ट चुनना नहीं, बल्कि यह समझना भी है कि वह आपके जीवन में वह क्या सुधार लाएगा। हम हर प्रोडक्ट को सही तरह से समझते हैं; जैसे कि उसकी उपयोगिता, उसकी खासियत और क्या वह वाकई किफायती है। हम यह सुनिश्चित करते हैं कि हमारे सुझाव आपकी समस्याओं को सुलझाने वाले साबित हों। पूरी छानबीन के बाद ही हम जानकारी को सरल बनाकर आप तक पहुंचाते हैं।</p>
            </div>
        </>
    )
}
