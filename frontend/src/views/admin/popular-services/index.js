import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Grid,
    CircularProgress,
    Typography,
    Chip,
    Tooltip,
    IconButton,
    Switch
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import defaultImage from '../../../assets/images/landing/default-noImage.jpg';
import DeleteModal from 'ui-component/landing/Components/deleteModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

const columns = [
    { id: 'id', label: '#', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    // { id: 'sort', label: 'Sort', minWidth: 100 },
    { id: 'coverImage', label: 'Thumnail Image', minWidth: 100 },
    { id: 'singleDenomination', label: 'Single/Multi Denomination', minWidth: 100 },
    { id: 'totalProduct', label: 'Total Products', minWidth: 100 },
    { id: 'hot', label: 'Hot', minWidth: 100 },
    // { id: 'add', label: 'Add Product', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 }
];

export default function PopularServices() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [popularProducts, setPopularProducts] = useState('');
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [hotlLoading, setHotLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [chanageHot, setChangeHot] = useState(false);
    const [hotValue, setHotValue] = useState('');
    const [change, setChange] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };
    useEffect(() => {
        const getPopularProducts = async () => {
            const response = await myAxios.get('/admin/get-products-with-module-name', { params: { moduleName: 'PopularService' } });
            if (response.status === 200) {
                setPopularProducts(response.data.data.results);
                setLoading(false);
            } else {
                console.error('Error fetching Games:', response.data);
                setLoading(false);
            }
        };
        getPopularProducts();
    }, [change]);
    useEffect(() => {
        if (currentId !== '' && currentIndex !== '') {
            const handleHotToggle = async () => {
                setHotLoading(true);
                // const newDataArray = [...popularProducts];
                // newDataArray[currentIndex].isHot = !newDataArray[currentIndex].isHot;
                const response = await myAxios.post('/admin/popular-product-hot-change', { id: currentId, isHot: !hotValue });
                if (response.status === 200) {
                    // setPopularProducts(newDataArray);
                    setChange(!change);
                    setHotLoading(false);
                }
            };
            handleHotToggle();
        }
    }, [chanageHot]);

    const handleRemove = async (product_id, index) => {
        const response = await myAxios.post(
            '/admin/delete-Product-with-module-name',
            { id: product_id },
            { params: { moduleName: 'PopularService' } }
        );
        const filterArray = popularProducts;
        filterArray.splice(index, 1);
        setPopularProducts([...filterArray]);
        setModalLoading(false);
        setOpen(false);
    };

    return (
        <MainCard content={false} title="Popular Services">
            {!loading ? (
                popularProducts.length > 0 ? (
                    <Grid>
                        {/* table */}
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                sx={{ py: 3, textAlign: 'center' }}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {popularProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                        <TableRow key={row._id} sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {row.singleProduct
                                                    ? row.products[0].product.originalName
                                                        ? row.products[0].product.originalName
                                                        : row.products[0].product.name
                                                    : row.name}
                                            </TableCell>
                                            {/* <TableCell sx={{ textAlign: 'center' }}>{row.sort}</TableCell> */}
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <img
                                                    src={
                                                        row.singleProduct
                                                            ? row.products[0].product.coverImageOriginal
                                                                ? row.products[0].product.coverImageOriginal
                                                                : row.products[0].product.images &&
                                                                    row.products[0].product.images.cover &&
                                                                    row.products[0].product.images.cover.thumbnail
                                                                    ? row.products[0].product.images.cover.thumbnail
                                                                    : row.products[0].product.images &&
                                                                        row.products[0].product.images.cover &&
                                                                        row.products[0].product.images.cover.url
                                                                        ? row.products[0].product.images.cover.url
                                                                        : row.products[0].product.screenshots &&
                                                                            row.products[0].product.screenshots[0]
                                                                            ? row.products[0].product.screenshots[0].url
                                                                            : row.products[0].product.images &&
                                                                                row.products[0].product.images.screenshots &&
                                                                                row.products[0].product.images.screenshots[0]
                                                                                ? row.products[0].product.images.screenshots[0].url
                                                                                : row.products[0].product.screenshots &&
                                                                                    row.products[0].product.screenshots[0]
                                                                                    ? row.products[0].product.screenshots[0].url
                                                                                    : defaultImage
                                                            : row.thumnailImage
                                                    }
                                                    style={{ width: '50px', height: '50px', borderRadius: 8 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={row.singleProduct ? 'Single' : 'Multiple'}
                                                    sx={{
                                                        background: theme.palette.success.light,
                                                        color: theme.palette.success.dark,
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={row.products.length}
                                                    sx={{
                                                        background: theme.palette.success.light,
                                                        color: theme.palette.success.dark,
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Switch
                                                    checked={row.isHot}
                                                    disabled={hotlLoading}
                                                    onChange={() => {
                                                        setCurrentIndex(index);
                                                        setCurrentId(row._id);
                                                        setHotValue(row.isHot);
                                                        setChangeHot(!chanageHot);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {!row.singleProduct && (
                                                    <Tooltip title="Edit" placement="top">
                                                        <IconButton
                                                            onClick={() =>
                                                                navigate('/admin/update-multi-denominations', {
                                                                    state: {
                                                                        multiProduct: row,
                                                                        moduleName: 'PopularService',
                                                                        navigationUrl: '/admin/pupular-services'
                                                                    }
                                                                })
                                                            }
                                                        >
                                                            <ModeIcon sx={{ color: theme.palette.success.main }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                                <Tooltip title="Delete" placement="top">
                                                    <IconButton
                                                        onClick={() => {
                                                            setCurrentIndex(index);
                                                            setCurrentId(row._id);
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <DeleteModal
                                open={open}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                                moduleName={'Popular Service'}
                                handleDelete={handleRemove}
                                index={currentIndex}
                                id={currentId}
                                modalLoading={modalLoading}
                                setModalLoading={setModalLoading}
                            />
                            {/* table pagination */}
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={popularProducts.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Grid>
                ) : (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <Typography sx={{ fontSize: 15 }}>No Record Founded</Typography>
                    </Grid>
                )
            ) : (
                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress sx={{ color: '#00ee34' }} />
                </Grid>
            )}
        </MainCard>
    );
}
