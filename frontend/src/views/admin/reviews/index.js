import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, useTheme, TableRow, Grid, CircularProgress, Typography, IconButton, Tooltip, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import DeleteModal from 'ui-component/landing/Components/deleteModal';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { id: 'id', label: '#', minWidth: 100 },
    { id: 'user_name', label: 'User Name', minWidth: 100 },
    { id: 'rating', label: 'Rating', minWidth: 100 },
    // { id: 'is_varified', label: 'Varified', minWidth: 100 },
    { id: 'message', label: 'message', minWidth: 100 },
    { id: 'sort', label: 'Sort', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

export default function Reviews() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState('');
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState('');
    const [currentId, setCurrentId] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    useEffect(() => {
        const getReviews = async () => {
            const response = await myAxios.get('/admin/get-reviews');
            if (response.status === 200) {
                setReviews(response.data.data.results)
                setLoading(false)
            } else {
                console.error('Error fetching Games:', response.data);
                setLoading(false)
            }
        }
        getReviews()

    }, []);

    const handleDelete = async (review_id, index) => {
        const response = await myAxios.post('/admin/delete-review', { id: review_id });
        const filterArray = reviews
        filterArray.splice(index, 1)
        setReviews([...filterArray])
        setModalLoading(false)
        setOpen(false)
    }


    return (

        <MainCard
            content={false}
            title="Reviews"
            secondary={
                <Button variant="outlined" onClick={() => navigate('/admin/add-edit-reviews', { state: { reviews: reviews } })}
                    disabled={loading ? true : false}
                    style={{ color: theme.palette.success.main, border: '1px solid', borderColor: !loading ? theme.palette.success.main : 'gray', width: '200px' }}
                >
                    {!loading ?
                        'Add Review'
                        :
                        <CircularProgress sx={{ color: 'gray' }} size={24} />
                    }
                </Button>
            }
        >
            {!loading ?
                (reviews.length > 0 ?
                    (
                        <Grid>
                            {/* table */}
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow >
                                            {columns.map((column) => (
                                                <TableCell key={column.id} sx={{ py: 3, textAlign: 'center' }} align={column.align} style={{ minWidth: column.minWidth }}>
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reviews
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => (
                                                <TableRow key={row._id} sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                                    <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.userName}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.rating}</TableCell>
                                                    {/* <TableCell sx={{ textAlign: 'center' }}>{row.isVarified ? 'Yes' : 'No'}</TableCell> */}
                                                    <TableCell sx={{ textAlign: 'center' }}> {row.message.split(' ').slice(0, 5).join(' ')}...</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.sort}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Tooltip title="Edit" placement="top">
                                                            <IconButton
                                                                onClick={() => navigate('/admin/add-edit-reviews', { state: { review: row, reviews: reviews } })}
                                                            >
                                                                <ModeIcon sx={{ color: theme.palette.success.main }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete" placement="top">
                                                            <IconButton sx={{ ml: 1 }} onClick={() => { setCurrentIndex(index); setCurrentId(row._id); setOpen(true) }}>
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <DeleteModal open={open} handleOpen={handleOpen} handleClose={handleClose} moduleName={'Review'} handleDelete={handleDelete} index={currentIndex} id={currentId} modalLoading={modalLoading} setModalLoading={setModalLoading} />
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={reviews.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>
                        </Grid>
                    ) :
                    (
                        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Typography sx={{ fontSize: 15 }}>
                                No Record Founded
                            </Typography>
                        </Grid>
                    )
                )
                :
                (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress sx={{ color: '#00ee34' }} />
                    </Grid>
                )
            }
        </MainCard>
    );
}
