import { Button, DrawerHeader, DrawerHeaderTitle, InlineDrawer, Toolbar, ToolbarButton } from "@fluentui/react-components";
import { AddRegular, DismissRegular, HistoryRegular, SettingsRegular } from "@fluentui/react-icons";
import React from "react";
import { useState } from "react"
import { MeasurementList } from "../components/MeasurementList";
import { MeasurementCategoryList } from "../components/MeasurementCategoryList";

export const MeasurementPage: React.FC = () => {
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

    return (
        <React.Fragment>
            <Toolbar style={{ justifyContent: 'flex-end', padding: '8px' }}>
                <ToolbarButton icon={<HistoryRegular />} onClick={() => setLeftDrawerOpen(true)}>Measurements</ToolbarButton>
                <ToolbarButton icon={<SettingsRegular />} onClick={() => setRightDrawerOpen(true)}>Categories</ToolbarButton>
                <ToolbarButton appearance="primary" icon={<AddRegular />}>Add</ToolbarButton>
            </Toolbar>

            <InlineDrawer position="start" open={leftDrawerOpen}>
                <DrawerHeader>
                    <DrawerHeaderTitle action={<Button appearance="subtle" icon={<DismissRegular />} onClick={() => setLeftDrawerOpen(false)} />}>
                        Measurements
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <MeasurementList />
            </InlineDrawer>

            <InlineDrawer position="end" open={rightDrawerOpen}>
                <DrawerHeader>
                    <DrawerHeaderTitle action={<Button appearance="subtle" icon={<DismissRegular />} onClick={() => setRightDrawerOpen(false)} />}>
                        Categories
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <MeasurementCategoryList />
            </InlineDrawer>

            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

            </div>
        </React.Fragment>
    );
}