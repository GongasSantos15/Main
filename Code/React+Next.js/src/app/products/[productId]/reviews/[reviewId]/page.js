export default function ProductDetails( {params}) {
    return (
        <h1> 
            Review {params.reviewId} for product {params.productId}
        </h1>
    );
}