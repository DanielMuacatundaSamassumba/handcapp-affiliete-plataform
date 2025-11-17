import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import useListEarns from "../services/useListEarns";
import { Earn } from "../types/EarnsType";
import { Eye } from "lucide-react";

const TransactionsEarnTable: React.FC = () => {
  const { eansData } = useListEarns();

const data: Earn[] =
  eansData?.map((item, i) => ({
    id: item.id ?? String(i),
    user_id: item.user_id,
    user_foreign_id: item.user_foreign_id,
    transation_number: item.transation_number, // <-- corrigido
    plan_name: item.plan_name,
    ammount_plan: item.ammount_plan,
    commition_rate: item.commition_rate,
    amount: item.amount,
  })) || [];

  const columns: TableProps<Earn>["columns"] = [
    {
      title: "Número de Transação",
      dataIndex: "transation_number",
      key: "transaction_number",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Plano",
      dataIndex: "plan_name",
      key: "plan_name",
    },
    {
      title: "Montante do Plano",
      dataIndex: "ammount_plan",
      key: "ammount_plan",
      render: (value) => `${value.toLocaleString()} KZ`,
    },
    {
      title: "Taxa de Comissão",
      dataIndex: "commition_rate",
      key: "commition_rate",
      render: (value) => `${value}%`,
    },
    {
      title: "Ganho",
      dataIndex: "amount",
      key: "amount",
      render: (value) => (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {value.toLocaleString()} KZ
        </span>
      ),
    },
     {/*
      title: "Comprovante",
      dataIndex: "amount",
      key: "amount",
      render: (value) => (
        <span style={{ color: "green", fontWeight: "bold", textAlign: 'center' , display:"block", }}>
         <Eye/>
        </span>
      ),
    */},
  ];

  return (
    <Table<Earn>
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5, showSizeChanger: true }}
    />
  );
};

export default TransactionsEarnTable;
