import { useParams } from 'react-router-dom';

function ProductScreen() {
  const { slug } = useParams();
  return (
    <div>{ slug }</div>
  )
}

export default ProductScreen