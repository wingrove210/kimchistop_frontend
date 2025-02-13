import React from 'react'
import { Link } from 'react-router-dom'
import MinusCartSvg from '../../svg/MinusCartSvg'
import PlusCartSvg from '../../svg/PlusCartSvg'
import RemoveCartSvg from '../../svg/RemoveCartSvg'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../redux/cart/slice'
import { CartItem as CartItemType } from '../../redux/cart/types'
import { HiPlusSm } from "react-icons/hi"
import { HiMinusSm } from "react-icons/hi"
import { RxCross2 } from "react-icons/rx"
import '../../scss/components/cart_item.css'
type CartItemProps = {
  id: string,
  image: string,
  name: string,
  price: number,
  quantity: number,
  description: string
}

export const CartItem: React.FC<CartItemProps> = ({
  id = '0',
  image = '',
  name = '',
  price = 0,
  quantity = 0,
  description = ''
}) => {
  const dispatch = useDispatch()

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItemType),
    )
  }

  const onClickMinus = () => {
    if (quantity === 1) onClickRemove()
    if (quantity > 1) dispatch(minusItem(id))
  }

  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить товар?')) {
      dispatch(removeItem(id))
    }
  }

  return (
    <div className='flex justify-between bg-[#F1F1F1] border-[1px] border-[#A2A2A2] py-2 px-2 gap-2'>

      <div className='flex justify-center items-center'>
        <Link key={id} to={`/pizza/${id}`}>
          <img
            className='w-[100px] h-[80px] rounded-[20px]'
            src={image}
            alt='Pizza'
          />
        </Link>
      </div>
      <div className='w-[165px]'>
        <Link key={id} to={`/pizza/${id}`} className='gap-2 flex flex-col'>
          <h3 className='font-term text-xl leading-4 overflow-hidden whitespace-nowrap text-ellipsis'>{name}</h3>
          <p className='font-next text-[6px] leading-2 overflow-hidden whitespace-nowrap text-ellipsis'>{description}</p>
        </Link>
        <div className='flex items-center gap-2 mt-2'>
            <button
              disabled={quantity === 0}
              onClick={onClickMinus}
              className='px-[2px] py-[2px] border-2 border-stone-600 rounded-full text-center'>
              {/* <MinusCartSvg /> */}
              <HiMinusSm />
            </button>
            <b>{quantity}</b>
            <button
              onClick={onClickPlus}
              className='px-[2px] py-[2px] border-2 border-stone-600 rounded-full text-center'>
              {/* <PlusCartSvg /> */}
              <HiPlusSm />
            </button>
          </div>
      </div>
      <div className='flex flex-col w-[100px] self-center items-center gap-1'>
        <div className="mt-[-30px] ml-[50px] absolute 13mini:mt-[-20px]">
          <div onClick={onClickRemove} className='border-2 border-stone-600 rounded-full px-1 py-1'>
            <div className=''><RxCross2 /></div>
          </div>
        </div>
        <div className='text-right'>
          <b className='text-xl font-term color w-[80px] text-right text-stone-600'>{price * quantity} P</b>
        </div>
      </div>
    </div>
    // <div className="card_item">
    //     <div className="card_load"></div>
    //     <div className="card_load_extreme_title"></div>
    //     <div className="card_load_extreme_descripion"></div>
    // </div>
  );
}