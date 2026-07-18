import { ComponentProps, FC } from "react";
import clsx from "clsx";
import Button from "./button";

interface HeaderProps extends ComponentProps<"header"> {
  username: string;
  title?: string;
  onLogout?: () => void;
  onMenuClick?: () => void;
}

const HamburgerIcon: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 5h14M3 10h14M3 15h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Header: FC<HeaderProps> = ({
  username,
  title = "Arvancloud Challenge",
  onLogout,
  onMenuClick,
  className,
  ...rest
}) => {
  const welcomeMessage = (
    <p className="text-sm text-foreground">
      Welcome <span className="font-bold">{username}</span>
    </p>
  );

  const logoutButton = (
    <Button variant="muted" size="medium" onClick={onLogout}>
      Log out
    </Button>
  );

  const menuButton = onMenuClick ? (
    <Button
      variant="muted"
      size="medium"
      aria-label="Open menu"
      className="min-h-9 min-w-9 px-0"
      onClick={onMenuClick}
    >
      <HamburgerIcon />
    </Button>
  ) : null;

  return (
    <header
      {...rest}
      className={clsx(
        "border border-b border-muted-light bg-background px-4 py-3 md:px-6",
        className,
      )}
    >
      <div className="hidden md:grid md:grid-cols-3 md:items-center">
        {welcomeMessage}

        <div className="justify-self-center rounded-lg bg-secondary-main px-8 py-3">
          <span className="text-sm font-bold text-foreground">{title}</span>
        </div>

        <div className="justify-self-end">{logoutButton}</div>
      </div>

      <div className="grid grid-cols-3 items-center md:hidden">
        <div className="justify-self-start">{logoutButton}</div>
        <div className="justify-self-center text-center">{welcomeMessage}</div>
        <div className="justify-self-end">{menuButton}</div>
      </div>
    </header>
  );
};

export default Header;
