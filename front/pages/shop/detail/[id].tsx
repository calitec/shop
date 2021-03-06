import * as React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { connect, useSelector } from 'react-redux';
import { selectProducts } from '../../../store/selectors/product';
import { loadProduct, loadProducts } from '../../../store/thunks/products';
import { loadUser } from "../../../store/thunks/users";
import axios from 'axios';
import wrapper from '../../../store/store';
import DetailTemplate from '../../../components/shop/detail/DetailTemplate';
import DetailContainer from '../../../components/shop/detail/DetailContainer';

const detail: React.FunctionComponent = ({ }) => {

  const router = useRouter();
  const { id }: any = router.query;
  const { product } = useSelector(selectProducts());

  return (
    <div>
      <DetailTemplate>
        {product ? <DetailContainer /> : ''}
      </DetailTemplate>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
  const state = await context.store.getState();
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  const { id } = context.params;
  if (!state.users.me) await context.store.dispatch(loadUser());
  await context.store.dispatch(loadProduct(id));
  await context.store.dispatch(loadProducts(null));

  return {
    props: {
      pathname: "/shop/detail",
    }
  };
}
);

export default connect(state => state)(detail);