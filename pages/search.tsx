import axios from "axios";
import { GetStaticProps } from "next";
import { MenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";
import { withLayout } from "../Layout/Layout"

interface SearchPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}

const SearchPage = (): JSX.Element => {
  return (
    <>
      Search
    </>
  );
};

export default withLayout(SearchPage);

export const getStaticProps:GetStaticProps<SearchPageProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};
