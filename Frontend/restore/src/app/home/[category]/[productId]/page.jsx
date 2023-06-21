import { DetailId } from './FetchDetail.jsx';
import { Navbar } from '@/app/components/navbar/navbar.jsx';
import { fetchDetail } from '../../fetch.js';

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.productId;

  const product = await fetchDetail(id);

  return product.result
    ? {
        title: product.result[0].name,
      }
    : { title: 'No encontrado' };
}

async function Detail({ params }) {
  return (
    <>
      <Navbar />
      <section>
        <DetailId param={params.productId} />
      </section>
    </>
  );
}

export default Detail;
