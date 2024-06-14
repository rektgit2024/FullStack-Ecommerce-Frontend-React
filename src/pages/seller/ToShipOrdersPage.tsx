import { Box, Button, Card, CardBody, Divider, Text } from "@chakra-ui/react";
import useGetToShip from "../../hooks/seller/useGetToShip";
import { useParams } from "react-router-dom";
import OrderCard from "../../components/Order/OrderCard";
import OrderItem from "../../entities/Order";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";

const ToShipOrdersPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  const { storeId } = useParams();
  const { data: orders, refetch: refetchToShipOrders } = useGetToShip(
    jwtToken,
    storeId!
  );
  const groupedOrders = orders?.orderModel.reduce(
    (acc: Record<string, OrderItem[]>, order) => {
      order.orderItemModels.forEach((item) => {
        if (!acc[item.orderId]) {
          acc[item.orderId] = [];
        }
        acc[item.orderId].push(item);
      });
      return acc;
    },
    {}
  );

  return (
    <>
      {groupedOrders &&
        Object.entries(groupedOrders).map(([orderId, storeOrders]) => {
          return (
            <Box key={orderId} mt="5px">
              <Card>
                <CardBody>
                  <Box display="flex" alignItems="center">
                    <Text
                      pr="20px"
                      fontWeight="semibold"
                      pl="5px"
                      textTransform="uppercase"
                      fontSize={{
                        base: "sm",
                        md: "md",
                        lg: "lg",
                        xl: "xl",
                      }}
                    >
                      {storeOrders[0].fullName}
                    </Text>

                    <Box position="absolute" right="25px" alignItems="center">
                      <Box
                        display="flex"
                        textAlign="center"
                        alignItems="center"
                      >
                        <Text
                          fontSize={{
                            base: "sm",
                            md: "md",
                          }}
                          mr="10px"
                          color="skyblue"
                        >
                          {storeOrders[0].orderStatusInfo}
                        </Text>
                        <Text fontWeight="" mr="10px" color="gray.500">
                          |
                        </Text>
                        <Text
                          fontSize={{
                            base: "sm",
                            md: "md",
                            lg: "lg",
                            xl: "xl",
                          }}
                          fontWeight="semibold"
                          color="orange.400"
                        >
                          {storeOrders[0].orderStatus}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Divider mt={2} mb={2} />
                  {storeOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                  <Divider mt={2} mb={2} />
                  <Box
                    display="flex"
                    justifyContent="end"
                    alignItems="end"
                    flexDirection="column"
                  >
                    <Text fontSize="xl" mb="15px" pt="5px">
                      Amount Payable:
                      <Text as="span" color="orange.400" ml="10px">
                        {formatCurrency(storeOrders[0].orderTotalAmount)}
                      </Text>
                    </Text>
                    <Button _hover={{ color: "orange.400" }}>Ship Order</Button>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          );
        })}
    </>
  );
};

export default ToShipOrdersPage;