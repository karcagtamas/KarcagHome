import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, makeStyles, tokens, type TableColumnDefinition, Text } from "@fluentui/react-components";
import type { Measurement } from "../models/measurement";
import { AddRegular, DeleteRegular, EditRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
        width: '100%',
    },
    actionCell: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
    },
});

type Props = {
    measurements: Measurement[];
    onEdit: (m: Measurement) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

export const MeasurementList: React.FC<Props> = ({
    measurements,
    onEdit,
    onDelete,
    onAdd,
}) => {
    const styles = useStyles();

    const columns: TableColumnDefinition<Measurement>[] = [
        createTableColumn<Measurement>({
            columnId: 'date',
            compare: (a, b) => a.date.localeCompare(b.date),
            renderHeaderCell: () => <b>Date</b>,
            renderCell: (item) => <Text>{new Date(item.date).toLocaleDateString()}</Text>,
        }),
        createTableColumn<Measurement>({
            columnId: 'value',
            compare: (a, b) => a.value - b.value,
            renderHeaderCell: () => <b>Value</b>,
            renderCell: (item) => <Text weight="semibold">{item.value}</Text>,
        }),
        createTableColumn<Measurement>({
            columnId: 'actions',
            renderHeaderCell: () => <b>Actions</b>,
            renderCell: (item) => (
                <div className={styles.actionCell}>
                    <Button
                        appearance="subtle"
                        icon={<EditRegular />}
                        onClick={() => onEdit(item)}
                    />
                    <Button 
                        appearance="subtle"
                        icon={<DeleteRegular />}
                        onClick={() => onDelete(item.id)}
                    />
                </div>
            ),
        }),
    ];

    return <div className={styles.container}>
        <Button appearance="primary" icon={<AddRegular />} onClick={onAdd}>
            Add Measurement
        </Button>

        <DataGrid
            items={measurements}
            columns={columns}
            sortable
            selectionMode="single"
            getRowId={(item) => item.id}
        >
            <DataGridHeader>
                <DataGridRow>
                    {({ renderHeaderCell }) => (<DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>)}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<Measurement>>
                {({ item, rowId }) => (
                    <DataGridRow<Measurement>>
                        {({ renderCell }) => (
                            <DataGridCell>{renderCell(item)}</DataGridCell>
                        )}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    </div>
};