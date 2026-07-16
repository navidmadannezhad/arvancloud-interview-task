import { ComponentProps, FC } from "react";
import clsx from "clsx";
import Button from "./button";

interface HeaderProps extends ComponentProps<"header"> {
  username: string;
  title?: string;
  onLogout?: () => void;
}

const Header: FC<HeaderProps> = ({
  username,
  title = "Arvancloud Challenge",
  onLogout,
  className,
  ...rest
}) => {
  return (
    <header
      {...rest}
      className={clsx(
        "grid grid-cols-3 items-center px-6 py-3 bg-background border border-b border-muted-light",
        className,
      )}
    >
      <p className="text-sm text-foreground">
        Welcome <span className="font-bold">{username}</span>
      </p>

      <div className="justify-self-center rounded-lg bg-secondary-main px-8 py-3">
        <span className="text-sm font-bold text-foreground">{title}</span>
      </div>

      <div className="justify-self-end">
        <Button variant="muted" size="medium" onClick={onLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
