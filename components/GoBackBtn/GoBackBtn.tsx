import { useRouter } from "next/router";
import { Button } from "../Button/Button";
import { GoBackBtnProps } from "./GoBackBtn.props";

export const GoBackBtn = ({ className }: GoBackBtnProps):JSX.Element => {
  const router = useRouter();

  const goBack = (): void => {
    router.back();
  };

  return (
    <Button
      appearance="primary"
      className={className}
      onClick={goBack}
    >
      Вернуться назад
    </Button>
  );
};
