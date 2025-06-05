import fs from "fs/promises";
import path from "path";
import { Icon } from "../examples/IconsExample";
import { ICON_LIST } from "../open-source/icons";

const ICONS_DIRECTORY = "registry/icons";

export const getIcons = async (): Promise<Icon[]> => {
    const iconsDir = path.join(process.cwd(), ICONS_DIRECTORY);

    const icons = await Promise.all(
        ICON_LIST.map(async ({ name, keywords }) => {
            const content = await fs.readFile(
                path.join(iconsDir, `${name}.tsx`),
                "utf-8"
            );

            return { name, content, keywords };
        })
    );

    return icons;
};
