import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
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
        where: { id: productId },
        include: { 
          restaurant: {
            select: {
                name: true,
                avatarImageUrl: true,
                slug: true,
            }
          }
        },  // Busca o nome do restaurante relacionado ao produto
    });

    if (!product) {
        console.error(`Produto com ID ${productId} não encontrado.`);
        return notFound();
    }

    if(product.restaurant.slug.toUpperCase() != slug.toUpperCase()) {
        return notFound();
    }

    return (

        <div className="flex h-full flex-col">
        <ProductHeader product={product} />
        <ProductDetails product={product} />
           

        </div>
           
    
    );
};


export default ProductPage;
