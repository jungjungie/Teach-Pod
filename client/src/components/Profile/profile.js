import React, { useState, useEffect } from "react"
import "./profile.css"
import { Card, Col, Row, CardTitle } from "reactstrap"
import Header from "../Header/header"
import Footer from "../Footer/footer"
import PodTable from "../PodTable/podTable"
import StudentTable from "../StudentTable/StudentTable"
import ProfileModal from "../ProfileModal/ProfileModal";
import PodModal from "../PodModal/PodModal";
import StudentModal from "../StudentModal/StudentModal";
import API from "../../utils/API"

const Profile = (props) => {
    const [loggedIn, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const [teacher, setTeacher] = useState({})
    const [pods, setPods] = useState([]);
    let key = props.match.params.id;
    const [profileData, setProfileData] = useState({
        prefix: "",
        firstName: "",
        lastName: "",
        image: "",
        gradesTaught: "",
        location: "",
        bio: ""
    })

    // For modal
    const { buttonLabel } = props;
    const [profileModal, setProfileModal] = useState(false);
    const [podModal, setPodModal] = useState(false);
    const [studentModal, setStudentModal] = useState(false);

    const toggle = () => setProfileModal(!profileModal);
    const toggle2 = () => setPodModal(!podModal);
    const toggle3 = () => setStudentModal(!studentModal);

    useEffect(() => {
        API.getTeacher(key)
            .then(res => {
                // console.log(res);
                setTeacher(res.data[0])
                console.log(teacher)
                setPods(res.data[0].pods)

                setProfileData({
                    prefix: teacher.prefix,
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    image: teacher.image,
                    gradesTaught: teacher.gradesTaught,
                    location: teacher.location,
                    bio: teacher.bio
                })
            }
            ).catch(err => console.log(err));
    }, [key])

    const refresh = () => {
        API.getTeacher(key)
            .then(res => {
                // console.log(res);
                setTeacher(res.data[0])
                console.log(teacher)
                setPods(res.data[0].pods)

                setProfileData({
                    prefix: teacher.prefix,
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    image: teacher.image,
                    gradesTaught: teacher.gradesTaught,
                    location: teacher.location,
                    bio: teacher.bio
                })
            }
            ).catch(err => console.log(err));
    }

    // Displays modal with form to edit profile
    const openProfileEditor = event => {
        setProfileModal(true);
        // console.log("==========================")
        // console.log(profileData)
    }

    // Captures edits made in modal form
    const handleInputChange = event => {
        console.log(event.target.value)

        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    }

    // const saveEdits = event => {
    //     event.preventDefault();

    //     toggle()

    //     // console.log(event.target.data)

    //     let updatedProfileData = {
    //         prefix: "",
    //         firstName: "",
    //         lastName: "",
    //         location: "",
    //         image: "",
    //         gradesTaught: "",
    //         bio: ""
    //     }

    //     API.updateTeacherProfile(updatedProfileData)
    //         .then(res => {
    //             // console.log(res);
    //             // console.log("profile updated!")
    //         })
    //         .catch(err => console.log(err));
    // }

    // Displays modal with form to add pod (for teachers only)
    const openPodForm = event => {
        setPodModal(true);
        // console.log(teacher)
    }

    // Displays modal with form to add student (for parents only)
    const openStudentForm = event => {
        // console.log("clicked")
        setStudentModal(true);
        // console.log(teacher)
    }

    return (
        <>
            <Header loggedIn={loggedIn} username={username} id={id} func={{ setLogin, setUsername, setId }} />
            <Row className="mt-5 profileCardRow">
                <Col xs="8" className="offset-2">
                    <Card className="profileCard">
                        <CardTitle className="text-center loginTitle darkGrayText">PROFILE
                    <hr className="line"></hr>
                        </CardTitle>
                        <Row className="m-3">

                            <Col className="proPicCol text-center" xs="6">
                                {teacher.image !== "" ? (
                                    <img className="img-fluid teacherImage" alt="" src={`../${teacher.image}`}></img>
                                ) : (
                                        <img className="img-fluid profileImage" alt="" src="../images/fullSize/profile-placeholder.png"></img>
                                    )}

                                <Row>
                                    {teacher.username === username ? (
                                        <>
                                            <Col></Col>
                                            <Col className="text-center">
                                                <i className="fa fa-pencil profileIcons hvr-fade" aria-hidden="true" onClick={openProfileEditor}></i>
                                            </Col>
                                            <Col className="text-center">
                                                {teacher.isTeacher === true ? (
                                                    <i onClick={openPodForm} className="fa fa-plus profileIcons hvr-fade" aria-hidden="true"></i>
                                                ) : (
                                                        <i onClick={openStudentForm} className="fa fa-plus profileIcons hvr-fade" aria-hidden="true"></i>
                                                    )}

                                            </Col>
                                            <Col></Col>
                                        </>
                                    ) : (
                                            <Col className="text-center">
                                                <a href="/messages" className="iconHvr-fade">
                                                    <i className="fa fa-envelope profileIcons mailIcon hvr-fade" aria-hidden="true"></i>
                                                </a>
                                            </Col>
                                        )}
                                </Row>
                            </Col>

                            <Col>
                                <Row>
                                    <Col>
                                        <h2>
                                            <strong className="aquaText">{teacher.firstName + " " + teacher.lastName}</strong>
                                        </h2>
                                    </Col>
                                </Row>
                                {teacher.bio}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            {teacher.isTeacher === true ? (
                <PodTable pods={pods} teacher={teacher} id={id} refresh={refresh} />
            ) : (
                    <StudentTable teacher={teacher} id={id} />
                )}

            <Footer />

            <ProfileModal
                toggle={toggle}
                profileModal={profileModal}
                buttonLabe={buttonLabel}
                teacher={teacher}
                // saveEdits={saveEdits}
                handleInputChange={handleInputChange}
                profileData={profileData}
                setProfileData={setProfileData}
            />

            <PodModal
                toggle2={toggle2}
                refresh={refresh}
                podModal={podModal}
                buttonLabe={buttonLabel}
                teacher={teacher}
                id={id}
            />

            <StudentModal
                toggle3={toggle3}
                studentModal={studentModal}
                buttonLabe={buttonLabel}
                id={id}
            />
        </>
    )
}

export default Profile