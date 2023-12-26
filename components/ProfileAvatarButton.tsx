import { Avatar, Button, Dropdown, Popover, Space, Typography } from "@douyinfe/semi-ui";
import { Divider } from "antd";
import { useState } from "react";
import {
    IconBell,
    IconHelpCircle,
    IconBytedanceLogo,
    IconHome,
    IconHistogram,
    IconLive,
    IconSetting,
    IconSemiLogo,
    IconTopbuzzLogo,
    IconBolt,
    IconLink,
    IconSend,
    IconExit
  } from "@douyinfe/semi-icons";
export function ProfileAvatarButton({
  name,
  logout,
}: {
  name: string | undefined;
  logout: () => void;
}) {

    const content = (
        <Dropdown.Menu>
                <Dropdown.Item icon={<IconExit></IconExit>} onClick={logout}>退出登录</Dropdown.Item>
        </Dropdown.Menu>
        
    )
  return (
    <Dropdown render={content}  position={'bottomRight'}>
      <Avatar color="orange" size="small">
        {name}
      </Avatar>
    </Dropdown>
  );
}
