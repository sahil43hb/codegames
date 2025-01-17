import { Card, Container, Grid } from '@mui/material';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import React from 'react';
import PaymentMethod from '../../../../../ui-component/landing/Components/PaymentMethod';
import { useSelector } from 'react-redux';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import Email from '../../../../../ui-component/landing/Components/Email';
import ChooseCurrency from '../../../../../ui-component/landing/Components/ChooseCurrency';
import Replenishment from '../../../../../ui-component/landing/Components/Replenishment';
import { containerSpace } from '../../../../../ui-component/landing/constants/style';
import PaymentDetail from '../../../../../ui-component/landing/Components/PaymentDetail';

const PubgPurchaseDetail = () => {
    // const [stock, setstock] = useState(true);
    const { productDetail } = useSelector((state) => state.productDetail);
    const { productGameDetail } = useSelector((state) => state.productDetail);
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: { sm: 3, xs: 1 },
                ...containerSpace
            }}
        >
            <Grid container spacing={1}>
                <Grid item lg={7.6} md={7.5} xs={12}>
                    <Email
                        // stock={true}
                        title="An activation code will be sent to the specified email address."
                        labal="Save e-mail for future replenishment"
                    />
                    <ChooseCurrency
                        // arr={PubgcurrancyArr}
                        mName={'2. Choose a currency'}
                        subtitle="UC PUBG Mobile Activation Code (Global) can be used for all servers"
                        bg={true}
                    />
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        <PaymentMethod
                            title="3. Payment Method"
                            // stock={stock}
                            screen="steam_purchase"
                        />
                    </Grid>
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        {productDetail && productGameDetail ? (
                            <Card
                                sx={{
                                    ...boxStyle
                                }}
                            >
                                <Replenishment title="4. Replenishment instructions" />
                            </Card>
                        ) : (
                            <Skelton
                                style={{
                                    width: '100%',
                                    height: {
                                        lg: '372px',
                                        md: '429px',
                                        sm: '426px',
                                        xs: '428px'
                                    }
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid item lg={0.5} md={0.2} xs={12} />
                <Grid item lg={3.9} md={4.3} xs={12} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <PaymentDetail
                    //  stock={productGameDetail ? productGameDetail.qty > 0 ? true : false: false} priceCommission={priceCommission}
                    />
                    <Grid sx={{ pt: 2 }}>
                        <Card sx={{ ...boxStyle, py: '370px !important', textAlign: 'center' }}>ADS Frame</Card>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PubgPurchaseDetail;
