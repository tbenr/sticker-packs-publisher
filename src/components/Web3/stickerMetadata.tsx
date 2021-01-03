import { parseEDNString, toEDNStringFromSimpleObject } from 'edn-data'

/*
{meta {:name      "Shiba"
                 :author    "Mugen Feng"
                 :thumbnail "e3010170122053ca0e6594e5e11a0b28b2ede71c26409f996fad419010c20d075f4452463300"
                 :preview   "e3010170122089927199d0149f15a62f3005e531c2cc1a71f145c782a72e393fe4e3a1bbe23f"
                 :stickers [{:hash "e30101701220cb70a410e0921d68c9fe2f7916a599fe4699f01b8a1b303c33d153117bde12dd"}{:hash "e301017012209154ef3dd24e3a43167388c1b2f287b93d32f9cce0c87e07348e7308e5512873"}]}}
                 */

interface Metadata {
    name: string,
    author: string,
    thumbnail: string,
    preview: string,
    stickers: {hash:string}[]
}

function createMetadataEDN(metadata:Metadata): string {
    return `{meta ${toEDNStringFromSimpleObject(metadata as any)}}`;
  }


function parseMetadataEDN(edn:string): Metadata {
    return Object.values(parseEDNString(edn,{ mapAs: 'object', keywordAs: 'string' }) as any)[0] as Metadata;
}
  
export {createMetadataEDN, parseMetadataEDN}
export type IMetadata = Metadata;