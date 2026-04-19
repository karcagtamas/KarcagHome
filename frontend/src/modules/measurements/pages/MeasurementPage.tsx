import { Button, DrawerHeader, DrawerHeaderTitle, InlineDrawer, makeStyles, Spinner, Toolbar, ToolbarButton } from "@fluentui/react-components";
import { AddRegular, DismissRegular, HistoryRegular, SettingsRegular } from "@fluentui/react-icons";
import React from "react";
import { useState } from "react"
import { MeasurementList } from "../components/MeasurementList";
import { useMeasurements } from "../../../hooks/useMeasurements";
import { MeasurementCategoryList } from "../components/MeasurementCategoryList";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minWidth: 0,
    },
    chartArea: {
        flexGrow: 1,
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export const MeasurementPage: React.FC = () => {
    const styles = useStyles();
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const { measurements, categories, isLoading } = useMeasurements();

    if (isLoading) {
        return (<Spinner label="Loading data..." />)
    }

    return (
        <div className={styles.root}>
            <InlineDrawer position="start" open={leftDrawerOpen}>
                <DrawerHeader>
                    <DrawerHeaderTitle action={<Button appearance="subtle" icon={<DismissRegular />} onClick={() => setLeftDrawerOpen(false)} />}>
                        Measurements
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <MeasurementList measurements={measurements} onAdd={() => { }} onEdit={() => { }} onDelete={() => { }} />
            </InlineDrawer>


            <div className={styles.content}>
                <Toolbar style={{ justifyContent: 'flex-end', padding: '8px' }}>
                    <ToolbarButton icon={<HistoryRegular />} onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}>Measurements</ToolbarButton>
                    <ToolbarButton icon={<SettingsRegular />} onClick={() => setRightDrawerOpen(!rightDrawerOpen)}>Categories</ToolbarButton>
                    <ToolbarButton appearance="primary" icon={<AddRegular />}>Add</ToolbarButton>
                </Toolbar>

                <div className={styles.chartArea}></div>
            </div>

            <InlineDrawer position="end" open={rightDrawerOpen}>
                <DrawerHeader>
                    <DrawerHeaderTitle action={<Button appearance="subtle" icon={<DismissRegular />} onClick={() => setRightDrawerOpen(false)} />}>
                        Categories
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <MeasurementCategoryList />
            </InlineDrawer>
        </div>
    );
}