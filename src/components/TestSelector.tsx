import { TestType } from "@dracomithril/types";
import { Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const SELECT_TEST_TEST_ID = "select-test";

export type TestSelectorOnChangeType = (value: string | string[]) => void;

type TestSelectorPropType = {
  value?: string | string[];
  onChange: TestSelectorOnChangeType;
  testList: TestType[];
  "data-testid"?: string;
  multiple?: boolean;
};

const TestSelector = ({
  testList,
  onChange,
  value,
  multiple,
  "data-testid": dataTestId,
}: TestSelectorPropType) => {
  const { t } = useTranslation();
  return (
    <Select
      value={value}
      style={{ width: 200 }}
      data-testid={dataTestId}
      onChange={onChange}
      placeholder={t("tests.select")}
      mode={multiple ? "multiple" : undefined}
    >
      {testList.map(({ id, name }) => (
        <Select.Option key={id} data-testid={`${dataTestId}__${id}`} value={id || ""}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};

TestSelector.defaultProps = {
  value: undefined,
  "data-testid": SELECT_TEST_TEST_ID,
  multiple: false,
};

export default TestSelector;
