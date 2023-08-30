const TrucksFormFields = {
  company: "company",
  truckData: "truckData",
};

export const { company, truckData } = TrucksFormFields;

function InitTrucksFormLogic(props) {
  const defaultValues = {
    [company]: props?.selectedRow.companyName,
    [truckData]: props?.selectedRow.trucks,
  };

  return {
    defaultValues,
  };
}

export default InitTrucksFormLogic;
