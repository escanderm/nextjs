import PromptCard from '@components/PromtCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => (
  <section className="w-full">
    <h1 className="head_text text-left">
      <span className="blue_gradient">{name} Profile</span>
    </h1>
    <p className="desc text-left">{desc}</p>

    <div className="prompt_layout mt-10">
      {data.map((post, i) => (
        <PromptCard
          key={i}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
  </section>
)

export default Profile
