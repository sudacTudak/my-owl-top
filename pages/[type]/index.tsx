import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../helpers/api";
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { withLayout } from "../../Layout/Layout";
import { TypePageComponent } from "../../page-components/TypePageComponent/TypePageComponent";

interface TypePageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}

interface TypePagePath {
  params: {
    type: string
  }
}

const TypePage = ({ menu, firstCategory }: TypePageProps): JSX.Element => {
  return (
    <TypePageComponent menu={menu} firstCategory={firstCategory}/>
  );
};

export default withLayout(TypePage);

export const getStaticPaths:GetStaticPaths = async () => {
  let paths:TypePagePath[] = [];

  paths = firstLevelMenu.map(item => ({
    params: {
      type: `${item.route}`
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps:GetStaticProps<TypePageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }
  const firstCategoryItem = firstLevelMenu.find(item => item.route == params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
