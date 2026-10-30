// Re-exports the native ProductSummaryList component so this app can expose
// its props (collection, orderBy, maxItems...) as editable content in Site
// Editor, without changing the rendered output.
import ProductSummaryList from 'vtex.product-summary/ProductSummaryList'

export default ProductSummaryList
