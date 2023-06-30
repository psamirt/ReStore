"use state"
import React, { useEffect, useState } from "react";
import "../dash.css";
import "./inventario.css";
import {
  Button,
  Space,
  Table,
  Typography,
  Image,
  Input,
  Upload,
  Modal,
} from "antd";
import axios from "axios";


import React from 'react'

function Marca() {
  return (
    <div className="app">
        <Space>
        <Typography.Title level={4}>Marca</Typography.Title>
            <Table>
            </Table>
        </Space>
    </div>
  )
}

export default Marca