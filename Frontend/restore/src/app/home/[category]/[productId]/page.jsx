import { DetailId } from './FetchDetail.jsx';
import { Navbar } from '@/app/components/navbar/navbar.jsx';

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
