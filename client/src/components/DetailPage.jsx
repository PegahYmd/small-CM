import { useEffect, useState } from "react";

import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import API from "../API.js";
import dayjs from "dayjs";
import getPublicationStatus from "../getPublicationStatus.js";

function DetailPage() {
  const { pageId } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    API.getPage(pageId).then((page) => {
      setDetail(page);
    });
  }, []);
  
  const getBlocks = (blocks) => {
    if (typeof JSON.parse(blocks) === "string")
      return JSON.parse(JSON.parse(blocks));
    return JSON.parse(blocks);
  };

  // console.log("page", detail);
  if (!detail) return "loading ...";
  return (
    <Container className="mt-4 detail-page">
      <Row>
        <Col lg={12} onClick={() => {}}>
          <p className="page-title">{detail.title}</p>
          <div className="d-flex">
            <p>Created by: {detail.author}</p>
            <p>
              Created at: {dayjs(detail.creation_date).format("MMMM D, YYYY")}
            </p>
            <p>Status: {getPublicationStatus(detail.publication_date)}</p>
          </div>
          
          <hr></hr>

          {getBlocks(detail.blocks).map((block) => {
            // console.log("block", block);
            if (block.type === "HEADER") return <h3 className="block-header">{block.value}</h3>;
            else if (block.type === "PARAGRAPH")
              return <p className="detail-paragraph">{block.value}</p>;
            else if (block.type === "IMAGE")
              return (
                <img
                  src={block.value.src}
                  className="detail-image"
                />
              );
          })}
          <Nav.Link href="#">
            <Link to={"/"} state={{ nextpage: location.pathname }} className="back-root-detail">
              <p>Back to all pages</p>
            </Link>
          </Nav.Link>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailPage;
