import { useNavigate } from 'react-router-dom';
import { selectedItemsSelector } from '../../../atoms/cart';
import { totalPriceSelector } from '../../../atoms/cart';
import { DELIVERY_FEE } from '../../../constants/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import { useMutateOrder } from '../../../hooks/order/order';
import * as S from './OrderAside.styles';

const OrderAside = () => {
  const totalPrice = useRefreshableRecoilValue(totalPriceSelector);
  const selectedItems = useRefreshableRecoilValue(selectedItemsSelector);
  const { postOrderMutation } = useMutateOrder();
  const navigate = useNavigate();
  const onOrder = async () => {
    console.log(`submit : ${[...selectedItems]}`);
    await postOrderMutation({ cartItemIds: [...selectedItems] });
    navigate('/order');
  };
  return (
    <S.Root>
      <S.Title>결제예상금액</S.Title>
      <S.TextWrapper>
        <S.Text>총 상품가격</S.Text>
        <S.Text>{totalPrice.toLocaleString()}원</S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>총 배송비</S.Text>
        <S.Text>{totalPrice ? DELIVERY_FEE.toLocaleString() : 0}원</S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>총 주문금액</S.Text>
        <S.Text>
          {totalPrice ? (totalPrice + DELIVERY_FEE).toLocaleString() : 0}원
        </S.Text>
      </S.TextWrapper>
      <S.OrderButton size='L' view='black' onClick={onOrder}>
        주문하기
      </S.OrderButton>
    </S.Root>
  );
};

export default OrderAside;
