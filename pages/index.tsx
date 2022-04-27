import { useState } from 'react';
import { withLayout } from '../Layout/Layout';
import { Htag, Button, Ptag, Tag, Rating, Input, TextArea } from '../components';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

interface HomeProps extends Record<string, unknown>{
  menu: MenuItem[];
  firstCategory: number;
}

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4);

  return (
    <>
      <Htag tag='h1'>Курсы по Photoshop</Htag>
      <Button appearance='primary' arrow='down'>Click on me</Button>
      <Button appearance='ghost' arrow='right'>Im a ghost</Button>
      <Ptag size='small'>Hello World IM a small p</Ptag>
      <Ptag>Hello World IM a medium p</Ptag>
      <Ptag size='large'>Hello World IM a large p</Ptag>
      <Tag>Дизайн</Tag>
      <Tag>Photoshop</Tag>
      <Tag color='ghost' size='medium'>Im a medium ghost tag</Tag>
      <Tag color='red' size='medium'>hh.ru</Tag>
      <Tag color='primary' size='small'>Im a small primary tag</Tag>
      <Tag color='gray' size='medium'> Im a medium gray tag</Tag>
      <Tag color='green' size='medium' href='www.google.com'> Im a medium green tag</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <Input placeholder='Поиск...'/>
      <TextArea placeholder='Текст отзыва'/>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};
