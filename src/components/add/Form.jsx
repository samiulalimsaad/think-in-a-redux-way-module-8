// import Success from "../ui/Success";
import { useState } from "react";
import {
    useAddVideoMutation,
    useEditVideoMutation,
} from "../../features/api/apiSlice";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

const initialState = {
    title: "",
    author: "",
    description: "",
    link: "",
    thumbnail: "",
    date: "",
    duration: "",
    views: "",
};

export default function Form({ video }) {
    const [addVideo, { isLoading, isError, isSuccess, error }] =
        useAddVideoMutation();
    const [
        editVideo,
        {
            isLoading: isLoading2,
            isError: isError2,
            isSuccess: isSuccess2,
            error: error2,
        },
    ] = useEditVideoMutation();

    const [state, setState] = useState(video || initialState);

    const resetForm = () => {
        setState(initialState);
    };
    const handleChange = (e) => {
        setState((p) => ({
            ...p,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addVideo(state);
        resetForm();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editVideo({ id: video?.id, data: state });
    };

    return (
        <form onSubmit={video?.id ? handleUpdate : handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                title="Video Title"
                                name="title"
                                value={state.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                                title="Author"
                                name="author"
                                value={state.author}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextArea
                                title="Description"
                                name="description"
                                value={state.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextInput
                                title="YouTube Video link"
                                name="link"
                                value={state.link}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextInput
                                title="Thumbnail link"
                                name="thumbnail"
                                value={state.thumbnail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput
                                title="Upload Date"
                                name="date"
                                value={state.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput
                                title="Video Duration"
                                name="duration"
                                value={state.duration}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput
                                title="Video no of views"
                                name="views"
                                value={state.views}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        disabled={isLoading || isLoading2}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>

                {isSuccess && (
                    <Success message="Video was added successfully" />
                )}
                {isSuccess2 && (
                    <Success message="Video was updated successfully" />
                )}
                {isError ||
                    (isError2 && (
                        <Success message={error?.message || error2?.message} />
                    ))}
            </div>
        </form>
    );
}
