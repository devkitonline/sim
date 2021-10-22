import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {Editor} from "@/components/base/Editor";
import {useEffect, useState} from "react";
const AdminPostCreate = () => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    return (
        <div>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper" style={{backgroundColor: '#fff'}}>
                <div className="page-body">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Basic form</h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group mb-3 ">
                                                <label className="form-label">Email address</label>
                                                <div>
                                                    <Editor
                                                        name="description"
                                                        onChange={(data) => {
                                                            setData(data);
                                                        }}
                                                        editorLoaded={editorLoaded}
                                                        value={undefined}/>
                                                    {JSON.stringify(data)}
                                                </div>
                                            </div>
                                            <div className="form-group mb-3 ">
                                                <label className="form-label">Password</label>
                                                <div>
                                                    <input type="password" className="form-control" placeholder="Password"/>
                                                        <small className="form-hint">
                                                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                                                            spaces, special characters, or emoji.
                                                        </small>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3 ">
                                                <label className="form-label">Select</label>
                                                <div>
                                                    <select className="form-select">
                                                        <option>Option 1</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-label">Checkboxes</label>
                                                <div>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" checked={true}/>
                                                            <span className="form-check-label">Option 1</span>
                                                    </label>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox"/>
                                                            <span className="form-check-label">Option 2</span>
                                                    </label>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" disabled={false}/>
                                                            <span className="form-check-label">Option 3</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Horizontal form</h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group mb-3 row">
                                                <label className="form-label col-3 col-form-label">Email address</label>
                                                <div className="col">
                                                    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
                                                        <small className="form-hint">We'll never share your email with anyone else.</small>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3 row">
                                                <label className="form-label col-3 col-form-label">Password</label>
                                                <div className="col">
                                                    <input type="password" className="form-control" placeholder="Password"/>
                                                        <small className="form-hint">
                                                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                                                            spaces, special characters, or emoji.
                                                        </small>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3 row">
                                                <label className="form-label col-3 col-form-label">Select</label>
                                                <div className="col">
                                                    <select className="form-select">
                                                        <option>Option 1</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="form-label col-3 col-form-label pt-0">Checkboxes</label>
                                                <div className="col">
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                            <span className="form-check-label">Option 1</span>
                                                    </label>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox"/>
                                                            <span className="form-check-label">Option 2</span>
                                                    </label>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                            <span className="form-check-label">Option 3</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Base_footer/>
        </div>
    )
}

export default AdminPostCreate;
