import React, { useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Import all our components
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import Checkbox from '../components/Checkbox';
import ConfirmDialog from '../components/ConfirmDialog';
import DataTable from '../components/DataTable';
import EmptyState from '../components/EmptyState';
import FormDialog from '../components/FormDialog';
import IconButton from '../components/IconButton';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import Radio from '../components/Radio';
import SearchInput from '../components/SearchInput';
import Select from '../components/Select';
import Snackbar from '../components/Snackbar';
import StatusBadge from '../components/StatusBadge';
import Switch from '../components/Switch';
import Tabs from '../components/Tabs';
import TextField from '../components/TextField';
import Tooltip from '../components/Tooltip';

function ComponentTest() {
  // State for various components
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');

  // Sample data for components
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const tabOptions = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];

  const tableColumns = [
    { id: 'name', label: 'Name' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
  ];

  const tableData = [
    { id: 1, name: 'Item 1', status: 'active' },
    { id: 2, name: 'Item 2', status: 'inactive' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Component Test Page"
        subtitle="Testing all components"
        action={
          <Button
            startIcon={<AddIcon />}
            onClick={() => setFormDialogOpen(true)}
          >
            Add New
          </Button>
        }
      />

      <Grid container spacing={3}>
        {/* Basic Components */}
        <Grid item xs={12}>
          <Card title="Basic Components">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Text Field"
                  placeholder="Enter text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  label="Select"
                  options={selectOptions}
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search..."
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Selection Components */}
        <Grid item xs={12}>
          <Card title="Selection Components">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Checkbox
                  label="Checkbox"
                  checked={checkboxValue}
                  onChange={(e) => setCheckboxValue(e.target.checked)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Radio.Group
                  label="Radio Group"
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Switch
                  label="Switch"
                  checked={switchValue}
                  onChange={(e) => setSwitchValue(e.target.checked)}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Dialog Components */}
        <Grid item xs={12}>
          <Card title="Dialog Components">
            <Grid container spacing={2}>
              <Grid item>
                <Button onClick={() => setConfirmDialogOpen(true)}>
                  Open Confirm Dialog
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => setFormDialogOpen(true)}>
                  Open Form Dialog
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => setSnackbarOpen(true)}>
                  Show Snackbar
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Status Components */}
        <Grid item xs={12}>
          <Card title="Status Components">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Alert severity="success" onClose={() => {}}>
                  Success Alert
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <StatusBadge status="active" />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Tab Component */}
        <Grid item xs={12}>
          <Card title="Tab Component">
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              tabs={tabOptions}
            >
              <Box p={2}>Content for Tab {selectedTab + 1}</Box>
              <Box p={2}>Content for Tab {selectedTab + 1}</Box>
              <Box p={2}>Content for Tab {selectedTab + 1}</Box>
            </Tabs>
          </Card>
        </Grid>

        {/* Table Component */}
        <Grid item xs={12}>
          <Card title="Table Component">
            <DataTable
              columns={tableColumns}
              data={tableData}
              searchFields={['name']}
            />
          </Card>
        </Grid>

        {/* Empty State Component */}
        <Grid item xs={12}>
          <Card title="Empty State Component">
            <EmptyState
              title="No Data"
              description="There is no data to display"
              action={() => {}}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={() => setConfirmDialogOpen(false)}
        title="Confirm Action"
        content="Are you sure you want to perform this action?"
      />

      <FormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onSubmit={() => setFormDialogOpen(false)}
        title="Form Dialog"
      >
        <TextField label="Name" fullWidth sx={{ mb: 2 }} />
        <TextField label="Description" fullWidth multiline rows={4} />
      </FormDialog>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal"
      >
        <Typography>Modal Content</Typography>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        message="This is a snackbar message"
        onClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
}

export default ComponentTest;
