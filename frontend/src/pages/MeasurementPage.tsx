import { Button, DrawerHeader, DrawerHeaderTitle, OverlayDrawer, Toolbar, ToolbarButton } from "@fluentui/react-components";
import { AddRegular, DismissRegular } from "@fluentui/react-icons";
import { useState } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const MeasurementPage: React.FC = () => {
    const [drawer, setDrawer] = useState<'history' | 'categories' | null>(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Toolbar style={{ justifyContent: 'flex-end', padding: '8px' }}>
                <ToolbarButton icon={<AddRegular />} onClick={() => setDrawer('categories')}>Categories</ToolbarButton>
                <ToolbarButton appearance="primary" icon={<AddRegular />}>Plus</ToolbarButton>
            </Toolbar>

            <OverlayDrawer position="start" open={!!drawer} onOpenChange={() => setDrawer(null)}>
                <DrawerHeader>
                    <DrawerHeaderTitle action={<Button appearance="subtle" icon={<DismissRegular />} onClick={() => setDrawer(null)} />}>
                        {drawer === 'history' ? 'History (Edit/Delete)' : 'Categories'}
                    </DrawerHeaderTitle>
                </DrawerHeader>
                <div style={{ padding: '20px' }}></div>

            </OverlayDrawer>

            <div style={{ flex: 1, padding: '40px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="timestamp" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                        <Line type="monotone" dataKey="value" stroke="#0078d4" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}