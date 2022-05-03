import axios from "axios";
import { GetStaticProps } from "next";
import { API } from "../helpers/api";
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
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};
