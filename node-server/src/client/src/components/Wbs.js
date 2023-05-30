import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";

const FlexWrapper = styled.div`
   display: flex;
   flex-direction: row;
   border-bottom: 1px solid gray;
`;

const FlexContainer = styled.div`
   display: flex;
   flex-direction: row;
    flex 1;
`;

const FlexContents = styled.div`
   display: flex;
   flex-direction: row;
   &:hover {
      background-color: #cbf8f0;
   }
    flex 1;
`;

const FlexHead = styled.div`
   display: flex;
   flex-direction: column;

   padding: 1rem;
   justify-content: center;
   flex: 0 1 70vh;
`;

const FlexCell = styled.div`
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   padding: 1rem;
   justify-content: center;
   flex: 0 1 70vh;
`;
const Column = styled.div`
   display: flex;
   flex-direction: row;
   flex: 0 1 40vh;
`;

const Wbs = () => {
   const [wbsList, setWbsList] = useState([]);

   const [category, setCategory] = useState("");
   //const [step, setStep] = useState("");
   const [workName, setWorkName] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");

   const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
   const [editCategory, setEditCategory] = useState("");
   const [editWorkName, setEditWorkName] = useState("");
   const [editStartDate, setEditStartDate] = useState("");
   const [editEndDate, setEditEndDate] = useState("");

   const [showModal, setShowModal] = useState(false);
   const [modalIndex, setModalIndex] = useState(null);
   const [showEditModal, setShowEditModal] = useState(false);
   const [editModalIndex, setEditModalIndex] = useState(null);
   const [editWorkIndex, setEditWorkIndex] = useState(null);

   useEffect(() => {
      const savedWbsList = localStorage.getItem("wbsList");
      if (savedWbsList) {
         setWbsList(JSON.parse(savedWbsList));
      }
   }, []);

   const handleCreateCategory = (e) => {
      e.preventDefault();

      const newWbs = { category, works: [] };
      const newWbsList = [...wbsList, newWbs];

      setWbsList(newWbsList);
      localStorage.setItem("wbsList", JSON.stringify(newWbsList));
      console.log(localStorage.getItem("wbsList"));

      setCategory("");
   };

   const handleCreateWork = (index, e) => {
      e.preventDefault();

      const newWork = { workName, startDate, endDate };
      const newWorks = [...wbsList[index].works, newWork];

      const newWbsList = wbsList.map((wbs, i) =>
         i === index ? { ...wbs, works: newWorks } : wbs
      );

      if (startDate > endDate) {
         alert("시작일이 종료일보다 클 수 없습니다.");
      } else {
         setWbsList(newWbsList);
         localStorage.setItem("wbsList", JSON.stringify(newWbsList));

         setWorkName("");
         setStartDate("");
         setEndDate("");
         setShowModal(false);
      }
   };

   const handleShowModal = (index) => {
      setModalIndex(index);
      setShowModal(true);
   };

   const handleEditModal = (index, workIndex) => {
      setEditModalIndex(index);
      setEditWorkIndex(workIndex);
      setShowEditModal(true);
   };

   // 카테고리 수정 핸들러
   const handleEditCategory = (index, e) => {
      e.preventDefault();

      const newWbsList = wbsList.map((wbs, i) =>
         i === index ? { ...wbs, category: editCategory } : wbs
      );

      setWbsList(newWbsList);
      localStorage.setItem("wbsList", JSON.stringify(newWbsList));
   };

   // 카테고리 삭제 핸들러
   const handleDeleteCategory = (index) => {
      const newWbsList = wbsList.filter((_, i) => i !== index);

      setWbsList(newWbsList);
      localStorage.setItem("wbsList", JSON.stringify(newWbsList));
      setShowEditModal(false);
   };

   // 작업 수정 핸들러
   const handleEditWork = (index, workIndex, e) => {
      e.preventDefault();

      if (editStartDate > editEndDate) {
         alert("시작일이 종료일보다 클 수 없습니다.");
      } else {
         const newWorks = wbsList[index].works.map((work, i) =>
            i === workIndex
               ? {
                     workName: editWorkName,
                     startDate: editStartDate,
                     endDate: editEndDate,
                 }
               : work
         );

         const newWbsList = wbsList.map((wbs, i) =>
            i === index ? { ...wbs, works: newWorks } : wbs
         );

         setWbsList(newWbsList);
         localStorage.setItem("wbsList", JSON.stringify(newWbsList));

         setEditWorkName("");
         setEditStartDate("");
         setEditEndDate("");
         setShowEditModal(false);
      }
   };

   // 작업 삭제 핸들러
   const handleDeleteWork = (index, workIndex) => {
      const newWorks = wbsList[index].works.filter((_, i) => i !== workIndex);

      const newWbsList = wbsList.map((wbs, i) =>
         i === index ? { ...wbs, works: newWorks } : wbs
      );

      setWbsList(newWbsList);
      localStorage.setItem("wbsList", JSON.stringify(newWbsList));
      setShowEditModal(false);
   };

   return (
      <div>
         <h1>WBS</h1>
         <FlexWrapper>
            <Column>
               <FlexHead>#</FlexHead>
               <FlexHead>카테고리</FlexHead>
            </Column>
            <FlexHead>
               <FlexContainer>
                  <FlexHead>단계</FlexHead>
                  <FlexHead>작업</FlexHead>
                  <FlexHead>시작일</FlexHead>
                  <FlexHead>종료일</FlexHead>
               </FlexContainer>
            </FlexHead>
         </FlexWrapper>
         <hr />
         {wbsList.map((wbs, index) => (
                
            <FlexWrapper key={index}>
               
               <Column>
                  <FlexCell>{index + 1}</FlexCell>
                  <FlexCell>
                     {editingCategoryIndex === index ? (
                        <div>
                           <Form.Control
                              type="text"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              onBlur={() => {
                                 handleEditCategory(index, { preventDefault: () => {} });
                                 setEditingCategoryIndex(null);
                              }}
                           />
                        </div>
                     ) : (
                        <div>
                           {wbs.category}
                           <Button
                              size="sm"
                              onClick={() => setEditingCategoryIndex(index)}
                           >
                              수정
                           </Button>
                        </div>
                     )}
                  </FlexCell>
               </Column>
               <FlexCell>
                  {wbs.works.map((work, workIndex) => (
                     <FlexContents
                        key={workIndex}
                        onClick={() => handleEditModal(index, workIndex)}
                     >
                        <FlexCell>{workIndex + 1}</FlexCell>
                        <FlexCell>{work.workName}</FlexCell>
                        <FlexCell>{work.startDate}</FlexCell>
                        <FlexCell>{work.endDate}</FlexCell>
                     </FlexContents>
                  ))}
                        <Button onClick={() => handleShowModal(index)}>작업 생성</Button>
                        <Button variant="danger" onClick={() => handleDeleteCategory(index)}>카테고리 삭제</Button>
               </FlexCell>

               {/* 작업 생성 모달 */}
               <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                     <Modal.Title>작업 생성</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Form onSubmit={(e) => handleCreateWork(modalIndex, e)}>
                        <Form.Control
                           type="text"
                           value={workName}
                           onChange={(e) => setWorkName(e.target.value)}
                           placeholder="작업"
                        />
                        <Form.Control
                           type="date"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                           placeholder="날짜"
                        />
                        <Form.Control
                           type="date"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                           placeholder="날짜"
                        />
                        <Button type="submit">작업 생성</Button>
                     </Form>
                  </Modal.Body>
               </Modal>

               {/* 작업 편집/삭제 모달 */}
               <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                  <Modal.Header closeButton>
                     <Modal.Title>작업 편집/삭제</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Form
                        onSubmit={(e) =>
                           handleEditWork(editModalIndex, editWorkIndex, e)
                        }
                     >
                        <Form.Control
                           type="text"
                           value={editWorkName}
                           onChange={(e) => setEditWorkName(e.target.value)}
                           placeholder="작업"
                        />
                        <Form.Control
                           type="date"
                           value={editStartDate}
                           onChange={(e) => setEditStartDate(e.target.value)}
                           placeholder="날짜"
                        />
                        <Form.Control
                           type="date"
                           value={editEndDate}
                           onChange={(e) => setEditEndDate(e.target.value)}
                           placeholder="날짜"
                        />
                        <Button type="submit">작업 편집</Button>
                        <Button
                           variant="danger"
                           onClick={() =>
                              handleDeleteWork(editModalIndex, editWorkIndex)
                           }
                        >
                           작업 삭제
                        </Button>
                     </Form>
                  </Modal.Body>
               </Modal>
            </FlexWrapper>
         ))}
         <Form onSubmit={handleCreateCategory}>
            <Form.Control
               type="text"
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               placeholder="카테고리"
               required
            />
            <Button type="submit"> 카테고리 생성 </Button>
         </Form>
      </div>
   );
};

export default Wbs;