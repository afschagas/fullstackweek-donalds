import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/product-header";

interface ProductPageProps {
    params: { slug: string; productId: string }; 
}

const ProductPage = async ({ params }: ProductPageProps) => {
    //console.log("Parâmetros recebidos:", params); 

  
    // if (!params || !params.productId) {
    //     console.error("Erro: params.productId está undefined!");
    //     return notFound();
    // }
    const { slug, productId } = params;
    console.log("Buscando produto com ID:", productId);

    const product = await db.product.findUnique({
        where: { id: productId }
    });

    if (!product) {
        console.error(`Produto com ID ${productId} não encontrado.`);
        return notFound();
    }

    return (
        <>
            <ProductHeader product={product} />
            <h1>Product</h1>
            {slug}
            {productId}
        </>
    );
};


export default ProductPage;
