import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { API } from "../helpers/api";
import { MenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";
import { ThirdCategoryItem } from "../interfaces/thirdCategoryLink.interface";
import { withLayout } from "../Layout/Layout";
import { SearchPageComponent } from "../page-components/SearchPageComponent/SearchPageComponent";

interface SearchPageProps extends Record<string, unknown> {
  searchedPages: ThirdCategoryItem[],
  firstCategory: TopLevelCategory,
  menu: MenuItem[]
}

const SearchPage = ({ searchedPages }: SearchPageProps): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.q ? `${router.query.q} - My OWL Top` : 'My OWL Top - Поиск' }</title>
        <meta property="og:title" content={router.query.q ? `${router.query.q} - My OWL Top` : 'My OWL Top - Поиск' }/>
      </Head>
      <SearchPageComponent searchedPages={searchedPages} router={router}/>
    </>
  );
};

export default withLayout(SearchPage);

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({ query }: GetServerSidePropsContext<ParsedUrlQuery>) => {
  if (!query.category || Array.isArray(query.category)) {
    return {
      notFound: true
    };
  }

  const firstCategory = parseInt(query.category);

  try {
    const { data: searchedPages } = await axios.post<ThirdCategoryItem[]>(API.topPage.textSearch, {
      firstCategory,
      text: query.q
    });

    if (!searchedPages) {
      return {
        props: {
          searchedPages: [],
          firstCategory,
          menu: []
        }
      };
    }

    return {
      props: {
        searchedPages,
        firstCategory,
        menu: []
      }
    };
  } catch {
    return {
      props: {
        searchedPages: [],
        firstCategory,
        menu: []
      }
    };
  }
};
