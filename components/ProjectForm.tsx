'use client'
import {ProjectInterface, SessionInterface} from "@/common.types";
import React, {ChangeEvent, useState} from "react";
import Image from "next/image";
import FormField from "@/components/FormField";
import {categoryFilters} from "@/constance";
import CustomMenu from "@/components/CustomMenu";
import {useRouter} from "next/navigation";
import Button from "@/components/Button";
import {createNewProject, fetchToken} from "@/lib/actions";

type Props = {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}

const ProjectForm = ({type, session, project}: Props) => {
    const router = useRouter()

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm] = useState({
        title: project?.title || "",
        description: project?.description || "",
        image: project?.image || "",
        liveSiteUrl: project?.liveSiteUrl || "",
        githubUrl: project?.githubUrl || "",
        category: project?.category || ""
    })

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        const { token } = await fetchToken()
        try{
            if (type === "create") {
                await createNewProject(form, session?.user?.id, token)

                router.push("/")
            }

            // if (type === "edit") {
            //     await updateProject(form, project?.id as string, token)
            //
            //     router.push("/")
            // }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.includes('image')) {
            return alert('Please upload an image file')
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const result = reader.result as string
            handleStateChange('image', result)
        }
    }
    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => (
            {...prevState, [fieldName]: value}
        ))
    }

    return (
        <form onSubmit={handleFormSubmit} className='form flexStart'>
            <div className='flexStart form_image-container'>
                <label htmlFor='poster' className='flexCenter form_image-label'>
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input id='image' type='file' accept='image/*' required={type === 'create'}
                       className='form_image-input'
                       onChange={handleChangeImage}
                />
                {form.image && (
                    <Image src={form?.image} alt='Project poster' className='sm:p-10 object-contain z-20' fill/>
                )}
            </div>
            <FormField title='Title' state={form.title} placeholder='Flexibble'
                       setState={(value) => handleStateChange('title', value)}/>
            <FormField title='Description' state={form.description}
                       placeholder='Showcase and discover remarkable developer projects.'
                       setState={(value) => handleStateChange('description', value)}/>
            <FormField title='Website URL' state={form.liveSiteUrl} placeholder='https://dev.pro'
                       setState={(value) => handleStateChange('liveSiteUrl', value)}/>
            <FormField title='GitHub URL' state={form.githubUrl} placeholder='https://github.com/name'
                       setState={(value) => handleStateChange('githubUrl', value)}/>

            <CustomMenu title='Category' state={form.category} filters={categoryFilters}
                        setState={(value) => handleStateChange('category', value)}/>
            <div className='flexStart w-full'>
                <Button
                    title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}/>
            </div>
        </form>
    );
};

export default ProjectForm;